const express = require('express');
const path = require('path');
const fs = require('fs');

const auth = require('../middleware/auth');
const pemesanan = require('../models/index').pemesanan;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**
 * @apiRoutes {get} /hotel/tipe_kamar/
 * @apiName GetAllTypeRoom
 * @apiGroup TypeRoom
 * @apiDescription Get all type room data
 */
app.get('/', async (req, res) => {
    await pemesanan.findAll()
        .then(result => res.json({ data: result }))
        .catch(error => res.json({ message: error.message }))
});

/**
 * @apiRoutes {get} /hotel/tipe_kamar/:id
 * @apiName GetTypeRoomById
 * @apiGroup TypeRoom
 * @apiDescription Get type room data by id
 */
app.get('/:id', async (req, res) => {
    let params = { pemesanan: req.params.pemesanan };

    await pemesanan.findOne({ where: params })
        .then(result => res.json({ data: result }))
        .catch(error => res.json({ message: error.message }))
});

/**
 * @apiRoutes {post} /hotel/tipe_kamar/
 * @apiName PostTypeRoom
 * @apiGroup TypeRoom
 * @apiDescription Insert type room data
 */
app.post('/', auth, async (req, res) => {
    let data = {
        nomor_pemesan: req.body.nomor_pemesan,
        nama_pemesan: req.body.nama_pemesan,
        email_pemesan: req.body.email_pemesan,
        tgl_pemesanan: req.body.tgl_pemesanan,
        tgl_check_in: req.body.tgl_check_in,
        tgl_check_out: req.body.tgl_check_out,
        nama_tamu: req.body.nama_tamu,
        jumlah_kamar: req.body.jumlah_kamar,
        id_tipe_kamar: req.body.id_tipe_kamar,
        id_user: req.body.id_user,
        status_pemesanan: req.file.status_pemesanan
    }

    await pemesanan.create(data)
        .then(result => res.json({ success: 1, message: "Data has been inserted", data: result }))
        .catch(error => res.json({ message: error.message }))
});

/**
 * @apiRoutes {put} /hotel/tipe_kamar/
 * @apiName PutTypeRoom
 * @apiGroup TypeRoom
 * @apiDescription Update tipe_kamar data
 */
app.put('/', auth, async (req, res) => {
    let params = { id_pemesanan: req.body.id_pemesanan }
    let data = {
        nomor_pemesan: req.body.nomor_pemesan,
        nama_pemesan: req.body.nama_pemesan,
        email_pemesan: req.body.email_pemesan,
        tgl_pemesanan: req.body.tgl_pemesanan,
        tgl_check_in: req.body.tgl_check_in,
        tgl_check_out: req.body.tgl_check_out,
        nama_tamu: req.body.nama_tamu,
        jumlah_kamar: req.body.jumlah_kamar,
        id_tipe_kamar: req.body.id_tipe_kamar,
        id_user: req.body.id_user,
        status_pemesanan: req.file.status_pemesanan
    }
    await pemesanan.update(data, { where: params })
        .then(result => res.json({ success: 1, message: "Data has been updated" }))
        .catch(error => res.json({ message: error.message }))
});

/**
 * @apiRoutes {delete} /hotel/tipe_kamar/:id
 * @apiName DeleteTypeRoom
 * @apiGroup TypeRoom
 * @apiDescription Delete type room data
 */
app.delete('/:id', auth, async (req, res) => {
    let params = { id_pemesanan: req.params.id_pemesanan }

    await pemesanan.destroy({ where: params })
        .then(result => res.json({ success: 1, message: "Data has been deleted" }))
        .catch(error => res.json({ message: error.message }))
});

module.exports = app;