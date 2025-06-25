const express = require('express');
const Player = require('../models/Player');
const Auction = require('../models/Auction');
const User = require('../models/User');
const TransactionHistory = require('../models/TransactionHistory');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const { resetDatabase } = require('../initialData');

module.exports = (app, io) => {
  const router = express.Router();

  const adminMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Autenticação necessária' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findByPk(decoded.id);
      if (user.privileges !== 'ADMIN') {
        return res.status(403).json({ message: 'Privilégios de administrador necessários' });
      }
      req.userId = decoded.id;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Token inválido' });
    }
  };

  const emitActionResult = (action, result) => {
    io.emit('update', { type: action.type, result });
  };

  const actionHandlers = {
    async addPlayer(action, auctionId) {
      const player = await Player.create({
        battleTag: action.battleTag,
        name: action.battleTag.split('#')[0],
        nationality: action.nationality,
        primaryRole: action.primaryRole,
        secondaryRole: action.secondaryRole,
        auctionId: auctionId,
        price: 0,
      });
      return { success: true, data: player };
    },

    async removePlayer(action, auctionId) {
      await Player.destroy({ where: { battleTag: action.battleTag, auctionId: auctionId } });
      return { success: true };
    },

    async addUser(action, auctionId) {
      const user = await User.create({
        username: action.username,
        password: await bcrypt.hash(action.password, 10),
        auctionId: auctionId,
      });
      return { success: true, data: user };
    },

    async linkCaptainToPlayer(action, auctionId) {
      const user = await User.findOne({ where: { username: action.username, auctionId: auctionId } });
      const player = await Player.findOne({ where: { battleTag: action.battleTag, auctionId: auctionId } });
      if (!user || !player) throw new Error('Capitão ou jogador não encontrado');
      player.isCaptainUsername = user.username;
      await player.save();
      return { success: true, data: player };
    },

    async removeCaptain(action, auctionId) {
      const userToRemove = await User.findOne({ where: { username: action.username, auctionId: auctionId } });
      if (!userToRemove) throw new Error('Capitão não encontrado');

      if (!userToRemove.isCaptain) {
        throw new Error('O usuário especificado não é um capitão');
      }

      await userToRemove.update({ isCaptain: false });

      await Player.update({ isCaptainUsername: null }, { where: { isCaptainUsername: userToRemove.username } });

      return { success: true };
    },

    async setCaptainCoins(action, auctionId) {
      const userToUpdate = await User.findOne({ where: { username: action.username, isCaptain: true } });
      if (!userToUpdate) throw new Error('Capitão não encontrado');
      userToUpdate.coins = action.coins;
      await userToUpdate.save();
      return { success: true, data: userToUpdate };
    },

    async setPlayerPrice(action, auctionId) {
      const updatedPlayer = await Player.findOne({ where: { battleTag: action.battleTag, auctionId: auctionId } });
      if (!updatedPlayer) throw new Error('Jogador não encontrado');
      updatedPlayer.price = action.price;
      await updatedPlayer.save();
      return { success: true, data: updatedPlayer };
    },

    async assignPlayer(action, auctionId) {
      const playerToAssign = await Player.findOne({ where: { battleTag: action.battleTag, auctionId: auctionId } });
      if (!playerToAssign) throw new Error('Jogador não encontrado');

      if (action.username) {
        const userToAssign = await User.findOne({ where: { username: action.username, isCaptain: true } });
        if (!userToAssign) throw new Error('Capitão não encontrado');

        playerToAssign.ownerUsername = userToAssign.username;
      } else {
        playerToAssign.ownerUsername = null;
      }
      await playerToAssign.save();
      return { success: true };
    },

    async startAuction(action, auctionId) {
      const auction = await Auction.findByPk(auctionId);
      if (auction.status === 'MAIN') {
        return { success: false, error: "Auction is already in MAIN status" };
      }
      await Auction.update({ status: 'MAIN' }, { where: { id: auctionId } });
      return { success: true };
    },

    async endAuction(action, auctionId) {
      const auction = await Auction.findByPk(auctionId);
      if (auction.status === 'HOLD') {
        return { success: false, error: "Auction is already in HOLD status" };
      }
      await Auction.update({ status: 'HOLD' }, { where: { id: auctionId } });
      return { success: true };
    },

    async startBackupAuction(action, auctionId) {
      const auction = await Auction.findByPk(auctionId);
      if (auction.status === 'BACKUP') {
        return { success: false, error: "Auction is already in BACKUP status" };
      }
      await Auction.update({ status: 'BACKUP' }, { where: { id: auctionId } });
      await User.update({ coins: 5 }, { where: { isCaptain: true, auctionId: auctionId } });
      return { success: true };
    },

    async resetAuction(action, auctionId) {
      console.log('uepa');
      await resetDatabase();
      return { success: true };
    },
  }

  // Input validation middleware
  const validateAdminActions = [
    body('actions').isArray().withMessage('Actions must be an array'),
    body('actions.*.type').isString().notEmpty().withMessage('Action type is required'),
    body('auctionId').isInt().withMessage('Invalid auction ID'),
  ];

  // Error handling middleware
  const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  };

  router.post('/actions', adminMiddleware, validateAdminActions, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { actions, auctionId } = req.body;
    const results = [];

    try {
      for (const action of actions) {
        const handler = actionHandlers[action.type];
        if (!handler) {
          results.push({ type: action.type, success: false, message: 'Unknown action type' });
          continue;
        }

        try {
          const result = await handler(action, auctionId);
          results.push({ type: action.type, ...result });
          emitActionResult(action, result);
        } catch (error) {
          results.push({ type: action.type, success: false, message: error.message });
          emitActionResult(action, { success: false, message: error.message });
        }
      }

      res.json(results);
    } catch (error) {
      next(error);
    }
  });

  app.use('/admin', router);
  app.use(errorHandler);
};