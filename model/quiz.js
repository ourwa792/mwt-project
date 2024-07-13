const seq = require("../utils/database").seq;

const Sequelize = require("sequelize");

const Quiz = seq.define(
  "Quiz",
  {
    id: {
      type: Sequelize.INTEGER,
      alowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    quizSchema: {
      type: Sequelize.DataTypes.JSON,
      alowNull: true,
    },

    defficulty: {
      type: Sequelize.DataTypes.STRING,
    },
    title: {
      type: Sequelize.STRING,
      alowNull: false,
    },
    tag: {
      type: Sequelize.STRING,
      alowNull: false,
    },
    maxScore: {
      type: Sequelize.DataTypes.INTEGER,
      alowNull: false,
    }},
  {
    timestamps: false,
  },
  {
    freezeTableName: true,
  }
);
module.exports = Quiz;
