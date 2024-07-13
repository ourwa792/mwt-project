const {DataTypes} = require("sequelize");

const seq = require("../utils/database").seq;

const FeedBack = seq.define(
  "feedback",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    rating: {
      type: DataTypes.JSON,
    },
    createdAt: {
      type: DataTypes.DATE ,
      allowNull: false,
      dafaultValue: DataTypes.NOW
    } ,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lessonId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    
  },
  {
    freezeTableName: true,
    timestamps: false ,
    indexes: [{
      unique: true,
      fields: ['userId','lessonId']
    }]
  }
);

module.exports = FeedBack;
