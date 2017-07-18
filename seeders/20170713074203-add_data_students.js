'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Students', [{
      first_name: 'Rusli',
      last_name: 'Abdul Gani',
      email: 'rusli.gani88@gmail.com',
      jurusan: 'IPA',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      first_name: 'Lisa',
      last_name: 'Kusumawati',
      email: 'lisa@hotmail.com',
      jurusan: 'IPS',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Students', null, {});
  }
};
