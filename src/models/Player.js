// src/models/Player.js
const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Player = sequelize.define('Player', {
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
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isCaptainUsername: {
    type: DataTypes.STRING,
    unique: true,
    references: {
      model: 'Users',
      key: 'username'
    }
  },
  ownerUsername: {
    type: DataTypes.STRING,
    references: {
      model: 'Users',
      key: 'username'
    }
  },
  battleTag: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  nationality: {
    type: DataTypes.STRING,
    allowNull: false
  },
  primaryRole: {
    type: DataTypes.ENUM('TANK', 'FLEX', 'DPS', 'HEALER', 'SOLO'),
    allowNull: false
  },
  secondaryRole: {
    type: DataTypes.ENUM('TANK', 'FLEX', 'DPS', 'HEALER', 'SOLO'),
    allowNull: true
  },
  playWithAnotherLanguage: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  }
}, {
  indexes: [
    {
      unique: true,
      fields: ['auctionId', 'battleTag']
    }
  ]
});

module.exports = Player;
