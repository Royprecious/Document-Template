'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.createTable('pages',{
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        documentId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'documents', 
            key: 'id'
          },
          onDelete: 'CASCADE' 
        },
        content:{
          type: Sequelize.TEXT,
          allowNull:false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('pages');
  }
};
