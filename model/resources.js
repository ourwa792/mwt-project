const {DataTypes} = require("sequelize");
const seq = require("../utils/database").seq;

const Resources = seq.define(
  "resources",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    thumbnailUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
    },
    publicId: {
      type: DataTypes.STRING,
    },
    thumbnailPublicId: {
      type: DataTypes.STRING,
      allowNull: true,
  },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);



module.exports = Resources
