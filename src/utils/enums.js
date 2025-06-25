// -- Create Privileges enum type
// CREATE TYPE "Privileges" AS ENUM ('ADMIN', 'USER');

const { DataTypes } = require("sequelize");

// -- Create TransactionType enum type
// CREATE TYPE "TransactionType" AS ENUM ('SYSTEM_PURCHASE', 'PLAYER_PURCHASE');

// -- Create AuctionStatus enum type
// CREATE TYPE "AuctionStatus" AS ENUM ('MAIN', 'BACKUP', 'HOLD');

// -- Create Role enum type
// CREATE TYPE "Role" AS ENUM ('TANK', 'FLEX', 'DPS', 'HEALER', 'SOLO');

const privilegesEnum = DataTypes.ENUM("ADMIN", "USER");
const transactionTypeEnum = DataTypes.ENUM("SYSTEM_PURCHASE", "PLAYER_PURCHASE");
const auctionStatusEnum = DataTypes.ENUM("MAIN", "BACKUP", "HOLD");
const roleEnum = DataTypes.ENUM("TANK", "FLEX", "DPS", "HEALER", "SOLO");

module.exports = {
  privilegesEnum,
  transactionTypeEnum,
  auctionStatusEnum,
  roleEnum
}