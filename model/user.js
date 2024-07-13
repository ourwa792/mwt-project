const Sequelize = require("sequelize");
const {DataTypes} = require('sequelize')
const seq = require("../utils/database").seq

const User = seq.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      alowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING,
      alowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      alowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue: 'icon/profileAvatar.png'
    },
    cloudinaryId: {
      type: DataTypes.STRING,
      alowNull: true
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    email: DataTypes.STRING,
    resetToken: DataTypes.STRING,
    resetTokenExpration: DataTypes.DATE,
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

User.findByEmail = async function (email) {
  return await User.findOne({ where: { email } });
};

User.isAdmin = async function (email, password) {
  if (email === 'test@gmail' && password === '12') {
    return true
  }
  else {
    console.log('not admin')
    return false
  }
}

module.exports = User;
