'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pemesanan', {
      id_pemesanan: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nomor_pemesan: {
        type: Sequelize.INTEGER
      },
      nama_pemesan: {
        type: Sequelize.STRING
      },
      email_pemesan: {
        type: Sequelize.STRING
      },
      tgl_pemesanan: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.DATE,
        allowNull: false
      },
      tgl_check_in: {
        type: Sequelize.DATE
      },
      tgl_check_out: {
        type: Sequelize.DATE
      },
      nama_tamu: {
        type: Sequelize.STRING
      },
      jumlah_kamar: {
        type: Sequelize.INTEGER
      },
      id_tipe_kamar: {
        type: Sequelize.INTEGER,
        references: {
          model: "tipe_kamar",
          key: "id_tipe_kamar"
        }
      },
      id_user: {
        type: Sequelize.INTEGER,
        references: {
          model: "user",
          key: "id_user"
        }
      },
      status_pemesanan: {
        type: Sequelize.ENUM('baru', 'check_in', 'check_out')
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
    await queryInterface.dropTable('pemesanan');
  }
};