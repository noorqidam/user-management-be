"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "John Doe",
          email: "johndoe@gmail.com",
          password: await bcrypt.hash("Rahasia123#", 10),
          roleId: 1,
          verified: true,
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Jane Smith",
          email: "janesmith@gmail.com",
          password: await bcrypt.hash("Admin1234#", 10),
          roleId: 2,
          verified: true,
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Bob Johnson",
          email: "bob.johnson@gmail.com",
          password: await bcrypt.hash("Admin1234#", 10),
          roleId: 2,
          verified: true,
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
