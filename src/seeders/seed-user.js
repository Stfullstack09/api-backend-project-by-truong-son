'use strict';

// fake dữ liệu vào dât base

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'truongsonpt.80@gmail.com',
      password: 'truongson2003', // khi lên data base thì ta phải haspassword có nghĩa là mã hóa ấy 
      firstName: 'Trường',
      lastName: 'Sơn',
      address: 'Hương Lung Cẩm Khê Phú Thọ',
      gender: 1,
      typeRole: 'ROLE',
      keyRole: 'R1',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
