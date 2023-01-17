'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('kamar', {
      id_kamar: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nomor_kamar: {
        type: Sequelize.INTEGER
      },
      id_tipe_kamar: {
        type: Sequelize.INTEGER,
        references: {
          model: "tipe_kamar",
          key: "id_tipe_kamar"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('kamar');
  }
};