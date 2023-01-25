const express = require('express');
const path = require('path');
const fs = require('fs');

const auth = require('../middleware/auth');
const tipe_kamar = require('../models/index').tipe_kamar;
const upload = require('../middleware/imageRoom');

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
    await tipe_kamar.findAll()
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
    let params = { id_tipe_kamar: req.params.id_tipe_kamar };

    await tipe_kamar.findOne({ where: params })
        .then(result => res.json({ data: result }))
        .catch(error => res.json({ message: error.message }))
});

/**
 * @apiRoutes {post} /hotel/tipe_kamar/
 * @apiName PostTypeRoom
 * @apiGroup TypeRoom
 * @apiDescription Insert type room data
 */
app.post('/', upload.uploadImage.single('foto'), auth, async (req, res) => {
    let data = {
        nama_tipe_kamar: req.body.nama_tipe_kamar,
        harga: req.body.harga,
        deskripsi: req.body.deskripsi,
        foto: req.file.filename
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
app.put('/', upload.uploadImage.single('foto'), auth, async (req, res) => {
    let params = { id_tipe_kamar: req.body.id_tipe_kamar }
    let data = {
        nama_tipe_kamar: req.body.nama_tipe_kamar,
        harga: req.body.harga,
        deskripsi: req.body.deskripsi,
    }

    if (req.file) {
        let oldImg = await tipe_kamar.findOne({ where: params });
        let oldImgName = oldImg.foto;

        let loc = path.join(__dirname, '../foto/', oldImgName);
        fs.unlink(loc, (err) => console.log(err));

        data.foto = req.file.filename;
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
    let params = { id_tipe_kamar: req.params.id_tipe_kamar }

    let delImg = await tipe_kamar.findOne({ where: params });
    if (delImg) {
        let delImgName = delImg.foto;
        let loc = path.join(__dirname, '../foto/', delImgName);
        fs.unlink(loc, (err) => console.log(err));
    }

    await tipe_kamar.destroy({ where: params })
        .then(result => res.json({ success: 1, message: "Data has been deleted" }))
        .catch(error => res.json({ message: error.message }))
});

module.exports = app;