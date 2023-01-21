const express = require('express');

const auth = require('../middleware/auth');
const kamar = require('../models/index').kamar;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**
 * @apiRoutes {get} /hotel/kamar/
 * @apiName GetAllRoom
 * @apiGroup Room
 * @apiDescription Get all room data
 */
app.get('/', async (req, res) => {
    await kamar.findAll()
        .then(result => res.json({ data: result }))
        .catch(error => res.json({ message: error.message }))
});

/**
 * @apiRoutes {get} /hotel/kamar/:id
 * @apiName GetRoomById
 * @apiGroup Room
 * @apiDescription Get room data by id
 */
app.get('/:id', async (req, res) => {
    let params = { id_kamar: req.params.id };

    await kamar.findOne({ where: params })
        .then(result => res.json({ data: result }))
        .catch(error => res.json({ message: error.message }))
});

/**
 * @apiRoutes {post} /hotel/kamar/
 * @apiName PostRoom
 * @apiGroup Room
 * @apiDescription Insert room data
 */
app.post('/', auth, async (req, res) => {
    let data = {
        nomor_kamar: req.body.nomor_kamar,
        id_tipe_kamar: req.body.id_tipe_kamar,
    }

    await kamar.create(data)
        .then(result => res.json({ success: 1, message: "Data has been inserted", data: result }))
        .catch(error => res.json({ message: error.message }))
});

/**
 * @apiRoutes {put} /hotel/kamar/
 * @apiName PutRoom
 * @apiGroup Room
 * @apiDescription Update room data
 */
app.put('/', auth, async (req, res) => {
    let params = { id_kamar: req.body.id_kamar }
    let data = {
        nomor_kamar: req.body.nomor_kamar,
        id_tipe_kamar: req.body.id_tipe_kamar,
    }
    await kamar.update(data, { where: params })
        .then(result => res.json({ success: 1, message: "Data has been updated" }))
        .catch(error => res.json({ message: error.message }))
});

/**
 * @apiRoutes {delete} /hotel/kamar/:id
 * @apiName DeleteRoom
 * @apiGroup Room
 * @apiDescription Delete room data
 */
app.delete('/:id', auth, async (req, res) => {
    let params = { id_kamar: req.params.id }

    await kamar.destroy({ where: params })
        .then(result => res.json({ success: 1, message: "Data has been deleted" }))
        .catch(error => res.json({ message: error.message }))
});

module.exports = app;