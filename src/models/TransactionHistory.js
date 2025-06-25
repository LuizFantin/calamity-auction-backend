// src/models/TransactionHistory.js
const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const TransactionHistory = sequelize.define('TransactionHistory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  auctionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Auctions',
      key: 'id'
    }
  },
  buyerUsername: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'username'
    }
  },
  sellerUsername: {
    type: DataTypes.STRING,
    allowNull: true,
    references: {
      model: 'Users',
      key: 'username'
    }
  },
  playerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Players',
      key: 'id'
    }
  },
  transactionType: {
    type: DataTypes.ENUM('SYSTEM_PURCHASE', 'PLAYER_PURCHASE'),
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

module.exports = TransactionHistory;
