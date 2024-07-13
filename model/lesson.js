const Sequelize = require("sequelize");

const seq = require('../utils/database').seq
const Lesson = seq.define(
  "lesson",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    content: {
      type: Sequelize.TEXT("long"),
      allowNull: false,
    },
    cover: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    grade: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    exercies: {
      type: Sequelize.DataTypes.TEXT("long"),
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


module.exports = Lesson;

// يمكن استخدامه ايضا في لفرونت اند كوسيط بين الرودكت و الكارت
