const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Player = require('../models/Player');
const { body, validationResult } = require('express-validator');

module.exports = (app, io) => {
  const router = express.Router();

  // Input validation middleware
  const validateLogin = [
    body('username').isString().notEmpty().withMessage('Username is required'),
    body('password').isString().notEmpty().withMessage('Password is required'),
  ];

  // Error handling middleware
  const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  };

  router.post('/login', validateLogin, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, password } = req.body;

      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      const player = await Player.findOne({ where: { name: username } });
      if (!player) {
        return res.status(400).json({ message: 'Player not found' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Incorrect password' });
      }

      let token;
      if (user.privileges === 'ADMIN') {
        token = jwt.sign({ id: user.id, privileges: 'ADMIN' }, process.env.JWT_SECRET);
      } else {
        token = jwt.sign({ id: user.id, privileges: user.privileges }, process.env.JWT_SECRET, { expiresIn: '1h' });
      }

      io.emit('userLoggedIn', { userId: user.id, username: user.username });

      res.json({ token, signedUserId: user.id, privileges: user.privileges, nationality: player.nationality, playWithAnotherLanguage: player.playWithAnotherLanguage });
    } catch (error) {
      next(error);
    }
  });

  app.use('/auth', router);
  app.use(errorHandler);
};