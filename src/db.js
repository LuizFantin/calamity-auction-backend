const sequelize = require('./models');
const { initializeData } = require('./initialData');

async function initializeDatabase() {
  await sequelize.sync();
  await initializeData();
}

module.exports = { initializeDatabase };
