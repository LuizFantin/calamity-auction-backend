const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Auction = sequelize.define('Auction', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  status: {
    type: DataTypes.ENUM('MAIN', 'BACKUP', 'HOLD'),
    allowNull: false,
    defaultValue: 'MAIN'
  }
});

module.exports = Auction;
