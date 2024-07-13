const Sequelize = require("sequelize");

const seq = require('../utils/database').seq

const Category = seq.define(
  "category",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
  {
    freezeTableName: true,
  }
);


module.exports = Category;
