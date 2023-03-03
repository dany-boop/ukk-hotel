const express = require('express');
const path = require('path');
const fs = require('fs');

const auth = require('../middleware/auth');
const { uploadTypeRoom } = require('../middleware/uploadImage');
const tipe_kamar = require('../models/index').tipe_kamar;
const kamar = require('../models/index').kamar;

const app = express();

/**
 * @apiRoutes {get} /hotel/type-room/
 * @apiName GetAllTypeRoom
 * @apiGroup TypeRoom
 * @apiDescription Get all type room data
 */
app.get('/', async (req, res) => {
    await tipe_kamar.findAll({ include: ['kamar'] })
        .then(result => res.json({ data: result }))
        .catch(error => res.json({ message: error.message }))
});

/**
 * @apiRoutes {get} /hotel/type-room/:id
 * @apiName GetTypeRoomById
 * @apiGroup TypeRoom
 * @apiDescription Get type room data by id
 */
app.get('/:id', async (req, res) => {
    let params = { id_tipe_kamar: req.params.id };

    await tipe_kamar.findOne({ where: params, include: ['kamar'] })
        .then(result => res.json({ data: result }))
        .catch(error => res.json({ message: error.message }))
});

/**
 * @apiRoutes {post} /hotel/type-room/
 * @apiName PostTypeRoom
 * @apiGroup TypeRoom
 * @apiDescription Insert type room data
 */
app.post('/', uploadTypeRoom.single('foto'), async (req, res) => {
    if (!req.file) return res.json({ message: "No file uploaded" })

    let finalImageURL = req.protocol + '://' + req.get('host') + '/room/' + req.file.filename;

    let data = {
        nama_tipe_kamar: req.body.nama_tipe_kamar,
        harga: req.body.harga,
        deskripsi: req.body.deskripsi,
        foto: finalImageURL
    }

    await tipe_kamar.create(data)
        .then(result => res.json({ success: 1, message: "Data has been inserted", data: result }))
        .catch(error => res.json({ message: error.message }))
});

/**
 * @apiRoutes {put} /hotel/type-room/
 * @apiName PutTypeRoom
 * @apiGroup TypeRoom
 * @apiDescription Update type room data
 */
app.put('/', uploadTypeRoom.single('foto'), auth, async (req, res) => {
    if (!req.file) return res.json({ message: "No file uploaded" })

    let params = { id_tipe_kamar: req.body.id_tipe_kamar };
    let data = {
        nama_tipe_kamar: req.body.nama_tipe_kamar,
        harga: req.body.harga,
        deskripsi: req.body.deskripsi
    }

    if (req.files) {
        let delImg = await tipe_kamar.findOne({ where: params });

        if (delImg) {
            let delImgName = delImg.foto;
            delImgName.forEach((img) => {
                let imgName = img.split('/').pop();

                let loc = path.join(__dirname, '../foto/room/' + imgName);
                fs.unlinkSync(loc, (err) => console.log(err));
            });
        }

        let finalImageURL = req.protocol + '://' + req.get('host') + '/room/' + file.filename;
        data.foto = finalImageURL;
    }

    await tipe_kamar.update(data, { where: params })
        .then(result => res.json({ success: 1, message: "Data has been updated" }))
        .catch(error => res.json({ message: error.message }))
});

/**
 * @apiRoutes {delete} /hotel/type-room/:id
 * @apiName DeleteTypeRoom
 * @apiGroup TypeRoom
 * @apiDescription Delete type room data
 */
app.delete('/:id', auth, async (req, res) => {
    let params = { id_tipe_kamar: req.params.id };

    let delImg = await tipe_kamar.findOne({ where: params });
    if (delImg) {
        let delImgName = delImg.foto.replace(req.protocol + '://' + req.get('host') + '/room/', '');
        let loc = path.join(__dirname, '../foto/room/', delImgName);
        fs.unlink(loc, (err) => console.log(err));
    }

    await tipe_kamar.destroy({ where: params })
        .then(result => res.json({ success: 1, message: "Data has been deleted" }))
        .catch(error => res.json({ message: error.message }))
});

module.exports = app;