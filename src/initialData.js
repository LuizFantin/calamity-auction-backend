// src/initialData.js

const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Player = require('./models/Player');
const Auction = require('./models/Auction');
const { players, users } = require('./initialData/index');

const auctions = [
  { status: 'MAIN' }
];

async function resetDatabase() {
  await User.destroy({ where: {} });
  await Player.destroy({ where: {} });
  await Auction.destroy({ where: {} });
  console.log('Database reset');
  await initializeData();
  console.log('Database initialized');
}

async function initializeData() {

  const auctionCount = await Auction.count();
  if (auctionCount === 0) {
    const newAuction = {
      id: 1,
      status: 'MAIN',
    }
    await Auction.create(newAuction);
    console.log('Initial auctions created');
  }

 

  const userCount = await User.count();
  if (userCount === 0) {
    for (let userData of users) {
      if (userData.hashedPassword || userData.unsafePassword) {
        userData.password = userData.hashedPassword || await bcrypt.hash(userData.unsafePassword, 10);
        await User.create({ ...userData });
      } else {
        console.log(userData.username, 'does not have a password');
      }
      
    }
    console.log('Initial users created');
  }

  const playerCount = await Player.count();
  if (playerCount === 0) {
    await Player.bulkCreate(players);
    console.log('Initial players created');
  }


  for(let userData of users){
    if (userData.battleTag && userData.isCaptain === true) {
          // find player and edit it 
          const player = await Player.findOne({ where: { battleTag: userData.battleTag } });
          player.isCaptainUsername = userData.username;
          await player.save();
        }
    }
}

module.exports = { initializeData, resetDatabase }; 