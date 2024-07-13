require('dotenv').config();
const Sequelize = require('sequelize');

const seq = new Sequelize('mwt_test', 'root', '12345', {
  dialect: 'mysql',
  host: 'localhost',
});

Database = (async () => {
  try {
    // Verify that database connection is valid
    await seq.authenticate();
    console.log('DB Created Successfuly .. ');
    // Drops existing tables if there are any
    await seq.sync({ alter: true });
  } catch (e) {
    console.log(`Error in database : ${e}`);
  }
})();

module.exports = { Database, seq };
