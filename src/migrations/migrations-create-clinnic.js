'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('clinnics', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            address: {
                type: Sequelize.STRING,
            },
            descriptionMarkDown: {
                type: Sequelize.TEXT,
            },
            descriptionHTML: {
                type: Sequelize.TEXT,
            },
            image: {
                type: Sequelize.BLOB,
            },
            name: {
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('clinnics');
    },
};
