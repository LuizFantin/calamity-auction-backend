// src/models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  privileges: {
    type: DataTypes.ENUM('ADMIN', 'USER'),
    allowNull: false,
    defaultValue: 'USER'
  },
  isCaptain: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  auctionId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Auctions',
      key: 'id'
    }
  },
  coins: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  }
});

module.exports = User;
