-- PostgreSQL config

-- Connect to the new database
\c mydb1

-- Create Privileges enum type
CREATE TYPE "Privileges" AS ENUM ('ADMIN', 'USER');

-- Create TransactionType enum type
CREATE TYPE "TransactionType" AS ENUM ('SYSTEM_PURCHASE', 'PLAYER_PURCHASE');

-- Create AuctionStatus enum type
CREATE TYPE "AuctionStatus" AS ENUM ('MAIN', 'BACKUP', 'HOLD');

-- Create Role enum type
CREATE TYPE "Role" AS ENUM ('TANK', 'FLEX', 'DPS', 'HEALER', 'SOLO');

-- Create Auctions table
CREATE TABLE "Auctions" (
  id SERIAL PRIMARY KEY,
  "status" "AuctionStatus" NOT NULL DEFAULT 'MAIN'
);

-- Create Users table
CREATE TABLE "Users" (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  privileges "Privileges" NOT NULL DEFAULT 'USER',
  "isCaptain" BOOLEAN NOT NULL DEFAULT FALSE,
  "auctionId" INTEGER,
  coins INTEGER NOT NULL DEFAULT 0 CHECK (coins >= 0),
  FOREIGN KEY ("auctionId") REFERENCES "Auctions"(id) ON DELETE SET NULL
);

-- Create Players table
CREATE TABLE "Players" (
  id SERIAL PRIMARY KEY,
  "auctionId" INTEGER NOT NULL,
  name VARCHAR(255) NOT NULL,
  "isCaptainUsername" VARCHAR(255) UNIQUE,
  "ownerUsername" VARCHAR(255),
  "battleTag" VARCHAR(255) UNIQUE NOT NULL,
  "nationality" VARCHAR(255) NOT NULL,
  "primaryRole" "Role" NOT NULL,
  "secondaryRole" "Role",
  price INTEGER NOT NULL DEFAULT 0 CHECK (price >= 0),
  FOREIGN KEY ("auctionId") REFERENCES "Auctions"(id) ON DELETE CASCADE,
  FOREIGN KEY ("ownerUsername") REFERENCES "Users"(username) ON DELETE SET NULL,
  FOREIGN KEY ("isCaptainUsername") REFERENCES "Users"(username) ON DELETE SET NULL,
  UNIQUE ("auctionId", "battleTag")
);

-- Create TransactionHistory table
CREATE TABLE "TransactionHistory" (
  id SERIAL PRIMARY KEY,
  "auctionId" INTEGER NOT NULL,
  "buyerUsername" VARCHAR(255) NOT NULL,
  "sellerUsername" VARCHAR(255),
  "playerId" INTEGER NOT NULL,
  "transactionType" "TransactionType" NOT NULL,
  "price" INTEGER NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("buyerUsername") REFERENCES "Users"(username) ON DELETE CASCADE,
  FOREIGN KEY ("sellerUsername") REFERENCES "Users"(username) ON DELETE SET NULL,
  FOREIGN KEY ("playerId") REFERENCES "Players"(id) ON DELETE CASCADE,
  FOREIGN KEY ("auctionId") REFERENCES "Auctions"(id) ON DELETE CASCADE
);

-- Indexes
CREATE INDEX idx_users_auctionid ON "Users" ("auctionId");
CREATE INDEX idx_players_auctionid ON "Players" ("auctionId");
CREATE INDEX idx_players_ownerusername ON "Players" ("ownerUsername");
CREATE INDEX idx_transactionhistory_auctionid ON "TransactionHistory" ("auctionId");
CREATE INDEX idx_transactionhistory_buyerusername ON "TransactionHistory" ("buyerUsername");
CREATE INDEX idx_transactionhistory_sellerusername ON "TransactionHistory" ("sellerUsername");
CREATE INDEX idx_transactionhistory_playerid ON "TransactionHistory" ("playerId");
