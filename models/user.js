"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
  }

  User.init(
    {
      fullname: { type: DataTypes.STRING, allowNull: false },
      username: { type: DataTypes.STRING, allowNull: false, unique: true },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      status: { type: DataTypes.STRING, defaultValue: false },
      token: { type: DataTypes.UUID, defaultValue: uuidv4 },
      profil: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
