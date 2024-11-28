"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Movies",
      [
        {
          title: "Blue lock",
          genre: "sport",
          poster: "https://ui-avatars.com/api/?name=John+Doe",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          title: "Conjuring",
          genre: "horor",
          poster: "https://ui-avatars.com/api/?name=John+Doe",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Movies", null, {});
  },
};
