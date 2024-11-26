"use strict";
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          fullname: "Rizki Taufiq R",
          username: "rizkitaufiq",
          email: "rizki@example.com",
          password: await bcrypt.hash("rizki123", 10),
          status: "active",
          token: uuidv4(),
          profil: "https://ui-avatars.com/api/?name=John+Doe",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          fullname: "Taufiq Rizki R",
          username: "taufiqrizki",
          email: "taufiq@example.com",
          password: await bcrypt.hash("rizki123", 10),
          status: "active",
          token: uuidv4(),
          profil: "https://ui-avatars.com/api/?name=John+Doe",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
