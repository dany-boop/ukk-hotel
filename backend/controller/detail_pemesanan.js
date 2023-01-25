const express = require('express');
const path = require('path');
const fs = require('fs');

const auth = require('../middleware/auth');
const detail_pemesanan = require('../models/index').detail_pemesanan;

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
    await detail_pemesanan.findAll()
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
    let params = { detail_pemesanan: req.params.detail_pemesanan };

    await detail_pemesanan.findOne({ where: params })
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
        id_pemesan: req.body.id_pemesan,
        id_kamar: req.body.id_kamar,
        tgl_akses: req.body.tgl_akses,
        harga: req.body.harga,
    }

    await tipe_kamar.create(data)
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
        id_pemesan: req.body.id_pemesan,
        id_kamar: req.body.id_kamar,
        tgl_akses: req.body.tgl_akses,
        harga: req.body.harga,
    }
    await tipe_kamar.update(data, { where: params })
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
    let params = { id_detail_pemesanan: req.params.id_pemesanan }

    await tipe_kamar.destroy({ where: params })
        .then(result => res.json({ success: 1, message: "Data has been deleted" }))
        .catch(error => res.json({ message: error.message }))
});

module.exports = app;