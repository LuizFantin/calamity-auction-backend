const express = require('express');
const Player = require('../models/Player');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const TransactionHistory = require('../models/TransactionHistory');
const Auction = require('../models/Auction');
const { param, body, validationResult } = require('express-validator');

const MAX_PLAYERS_PER_TEAM = 6; // Define the maximum number of players per team

module.exports = (app, io) => {
  const router = express.Router();

  const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Autenticação necessária' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.id;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Token inválido' });
    }
  };

  // Input validation middleware
  const validateAuctionId = [
    param('auctionId').isInt().withMessage('Invalid auction ID'),
  ];

  const validateBuyPlayer = [
    param('auctionId').isInt().withMessage('Invalid auction ID'),
    param('playerId').isInt().withMessage('Invalid player ID'),
  ];

  // Error handling middleware
  const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  };

  router.get('/:auctionId', validateAuctionId, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { auctionId } = req.params;
      const players = await Player.findAll({
        where: { auctionId: auctionId }
      });
      res.json(players);
    } catch (error) {
      next(error);
    }
  });

  router.get('/:auctionId/captains', validateAuctionId, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { auctionId } = req.params;
      const captains = await User.findAll({
        where: {
          isCaptain: true
        }
      });

      const captainsData = captains.map(user => ({
        username: user.username,
        coins: user.coins,
        auctionId: user.auctionId
      }));

      res.json(captainsData);
    } catch (error) {
      next(error);
    }
  });

  router.get('/:auctionId/teams', validateAuctionId, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { auctionId } = req.params;
      const users = await User.findAll({
        where: {
          auctionId: auctionId,
          isCaptain: true
        }
      });

      const teams = [];
      for (const user of users) {
        const players = await Player.findAll({
          where: {
            auctionId: auctionId,
            ownerUsername: user.username
          }
        });

        teams.push({
          captain: user,
          players: players
        });
      }

      res.json(teams);
    } catch (error) {
      next(error);
    }
  });

  router.post('/:auctionId/buy/:playerId', authMiddleware, validateBuyPlayer, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { auctionId, playerId } = req.params;
      const user = await User.findByPk(req.userId);
      const player = await Player.findByPk(playerId);
      const auction = await Auction.findByPk(auctionId);

      if (!user || !user.isCaptain) {
        return res.status(404).json({ message: 'Usuário não encontrado ou não é capitão' });
      }

      if (!player) {
        return res.status(404).json({ message: 'Jogador não encontrado' });
      }

      if (!auction) {
        return res.status(404).json({ message: 'Leilão não encontrado' });
      }

      if (player.ownerUsername === user.username) {
        return res.status(400).json({ message: 'Jogador já está no seu time' });
      }

      const playerCount = await Player.count({
        where: {
          auctionId: auctionId,
          ownerUsername: user.username
        }
      });

      if (playerCount >= MAX_PLAYERS_PER_TEAM) {
        return res.status(400).json({ message: `Você já possui o número máximo de jogadores (${MAX_PLAYERS_PER_TEAM})` });
      }

      if (user.coins < player.price) {
        return res.status(400).json({ message: 'Moedas insuficientes' });
      }

      if (player.ownerUsername) {
        const previousOwner = await User.findOne({ where: { username: player.ownerUsername } });
        if (previousOwner) {
          previousOwner.coins += (player.price - 1);
          await previousOwner.save();
        }
      }

      user.coins -= player.price;
      await user.save();

      await TransactionHistory.create({
        auctionId: auctionId,
        buyerUsername: user.username,
        sellerUsername: player.ownerUsername || null,
        playerId: player.id,
        transactionType: 'PLAYER_PURCHASE',
        price: player.price
      });

      player.ownerUsername = user.username;
      player.price += 1;
      await player.save();

      io.emit('update', {
        auctionId,
        playerId,
        buyerUsername: user.username,
        remainingCoins: user.coins,
        newPlayerPrice: player.price
      });

      res.json({
        message: 'Jogador comprado com sucesso',
        remainingCoins: user.coins,
        newPlayerPrice: player.price
      });
    } catch (error) {
      next(error);
    }
  });

  router.get('/:auctionId/transactions', validateAuctionId, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { auctionId } = req.params;

      // Get all transactions for this auction (no associations)
      const transactions = await TransactionHistory.findAll({
        where: { auctionId: auctionId },
        order: [['createdAt', 'DESC']]
      });

      const players = await Player.findAll({
        where: { auctionId: auctionId }
      });

      const transactionsMap = transactions.map(transaction => {
        const player = players.find(p => p.id === transaction.playerId);
        return {
          ...transaction.toJSON(),
          playerName: player ? player.name : 'Unknown Player',
          playerBattleTag: player ? player.battleTag : 'Unknown BattleTag'
        };
      });

      res.json(transactionsMap);
    } catch (error) {
      next(error);
    }
  });

  app.use('/players', router);
  app.use(errorHandler);
};