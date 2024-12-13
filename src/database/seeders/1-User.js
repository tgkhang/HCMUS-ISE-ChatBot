'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const items = [{
      "email": "abc",
      "password": "123",
      "firstName": "Gloriana",
      "lastName": "Harvard",
      "token": 31
    }, {
      "email": "abasilone1@dot.gov",
      "password": "fR5+rKgDgTup5OkS",
      "firstName": "Aila",
      "lastName": "Basilone",
      "token": 23
    }, {
      "email": "dsilk2@wix.com",
      "password": "xP7@olujJ}",
      "firstName": "Dawn",
      "lastName": "Silk",
      "token": 31
    }, {
      "email": "cklaassens3@jugem.jp",
      "password": "zO4?7w8j",
      "firstName": "Chantalle",
      "lastName": "Klaassens",
      "token": 30
    }, {
      "email": "wescoffier4@apple.com",
      "password": "xK2>Qc<o",
      "firstName": "Willi",
      "lastName": "Escoffier",
      "token": 29
    }, {
      "email": "mpease5@wix.com",
      "password": "nD3}fq{JP?M",
      "firstName": "Maurie",
      "lastName": "Pease",
      "token": 45
    }, {
      "email": "ewheelwright6@mac.com",
      "password": "mM6>Z1JlcN$7W01x",
      "firstName": "Ellene",
      "lastName": "Wheelwright",
      "token": 36
    }, {
      "email": "kgilliard7@bigcartel.com",
      "password": "wM5=ORBJn(LHMV_",
      "firstName": "Klement",
      "lastName": "Gilliard",
      "token": 23
    }];

    items.forEach(item => {
      item.password = bcrypt.hashSync(item.password, 10); 
      item.createdAt = Sequelize.literal('NOW()');
      item.updatedAt = Sequelize.literal('NOW()');
    });
    await queryInterface.bulkInsert('Users', items, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
