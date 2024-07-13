const seq = require("../utils/database").seq

const Sequelize = require("sequelize")

const QuizResult = seq.define(
  "QuizResult",
  {
    id: {
      type: Sequelize.INTEGER,
      alowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    resultSchems: {
      type: Sequelize.DataTypes.JSON,
    },
    userScore: Sequelize.DataTypes.INTEGER,
  },
  {
    timestamps: false,
  },
  {
    freezeTableName: true,
  }
);

module.exports = QuizResult;
