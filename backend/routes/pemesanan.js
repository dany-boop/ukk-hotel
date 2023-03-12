const express = require('express');
const { Op } = require('sequelize')

const auth = require('../middleware/auth');
const pemesanan = require('../models/index').pemesanan;
const detail_pemesanan = require('../models/index').detail_pemesanan;
const kamar = require('../models/index').kamar;
const tipe_kamar = require('../models/index').tipe_kamar;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**
 * @apiRoutes {get} /hotel/booking/
 * @apiName GetAllTypeRoom
 * @apiGroup TypeRoom
 * @apiDescription Get all booking data
 */
app.get('/', async (req, res) => {
    await pemesanan.findAll({ include: ['user', 'tipe_kamar'] })
        .then(result => res.json({ data: result }))
        .catch(error => res.json({ message: error.message }))
});

/**
 * @apiRoutes {get} /hotel/tipe_kamar/:id
 * @apiName GetTypeRoomById
 * @apiGroup TypeRoom
 * @apiDescription Get booking data by id
 */
app.get('/:id', async (req, res) => {
    let params = { pemesanan: req.params.pemesanan };

    await pemesanan.findAll({ where: params, include: ['user', 'tipe_kamar'] })
        .then(result => res.json({ data: result }))
        .catch(error => res.json({ message: error.message }))
});

/**
 * @apiRoutes {get} /hotel/booking/customer/:id
 * @apiName GetBookingByCustomerId
 * @apiGroup Booking
 * @apiDescription Get booking data by customer id
 */
app.get('/customer', async (req, res) => {
    let params = { email_pemesan: req.body.email_pemesan };

    await pemesanan.findAll({ where: params, include: ['user', 'tipe_kamar'] })
        .then(result => res.json({ data: result }))
        .catch(error => res.json({ message: error.message }))
});


/**
 * @apiRoutes {post} /hotel/tipe_kamar/
 * @apiName PostTypeRoom
 * @apiGroup TypeRoom
 * @apiDescription Insert booking data
 */
app.post('/', auth, async (req, res) => {
    let dt = Date.now();
    let receiptNum = Math.floor(Math.random() * (1000000000 - 99999999) + 99999999);

    let data = {
        nomor_pemesan: receiptNum,
        nama_pemesan: req.body.nama_pemesan,
        email_pemesan: req.body.email_pemesan,
        tgl_pemesanan: dt,
        tgl_check_in: req.body.tgl_check_in,
        tgl_check_out: req.body.tgl_check_out,
        nama_tamu: req.body.nama_tamu,
        jumlah_kamar: req.body.jumlah_kamar,
        id_tipe_kamar: req.body.id_tipe_kamar,
        id_user: req.body.id_user,
        status_pemesanan: req.file.status_pemesanan
    };
    // data kamar
    let dataKamar = await kamar.findAll({ where: { id_tipe_kamar: data.id_tipe_kamar } });

    // data tipe kamar
    let dataTipeKamar = await tipe_kamar.findOne({ where: { id_tipe_kamar: data.id_tipe_kamar } });

    let dataPemesanan = await tipe_kamar.findAll({
        attributes: ["id_tipe_kamar", "nama_tipe_kamar"],
        where: { id_tipe_kamar: data.id_tipe_kamar },
        include: [
            {
                model: kamar,
                as: "kamar",
                attributes: ["id_kamar", "id_tipe_kamar"],
                include: [
                    {
                        model: detail_pemesanan,
                        as: "detail_pemesanan",
                        attributes: ["tgl_akses"],
                        where: {
                            tgl_akses: {
                                [Op.between]: [data.tgl_check_in, data.tgl_check_out]
                            }
                        }
                    }
                ]
            },
        ]
    });
    //  cari kamar yang ada
    let pesanKamarId = dataPemesanan[0].kamar.map((room) => room.id_kamar);
    let adaKamar = dataKamar.filter((room) => !pesanKamarId.includes(room.id_kamar));

    // proses pesan kamar kalo ada
    let pilihDataKamar = adaKamar.slice(0, data.jumlah_kamar);

    // hitung hari
    let checkIn = new Date(data.tgl_check_in);
    let checkOut = new Date(data.tgl_check_out);
    const totalHari = Math.round((checkOut - checkIn) / (1000 * 3600 * 24));

    if (dataKamar === null || adaKamar.length < data.jumlah_kamar || totalHari === 0 || pilihDataKamar === null) {
        return res.json({ message: "Kamar tidak tersedia" });
    } else {
        await pemesanan.create(data)
            .then(async (result) => {
                for (let i = 0; i < totalHari; i++) {
                    for (let j = 0; j < pilihDataKamar.length; j++) {
                        let tgl_akses = new Date(checkIn);
                        tgl_akses.setDate(tgl_akses.getDate() + i);

                        let reqDataDetail = {
                            id_pemesanan: result.id_pemesanan,
                            id_kamar: pilihDataKamar[j].id_kamar,
                            tgl_akses: tgl_akses,
                            harga: dataTipeKamar.harga,
                        };

                        await detail_pemesanan.create(reqDataDetail);
                    }
                }
                res.json({ success: 1, message: "Berhasil pesan kamar", data: result })
            })
            .catch(err => res.json({ message: err.message }))
    };
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
 * @apiDescription Delete booking data
 */
app.delete('/:id', auth, async (req, res) => {
    try {
        let params = { id_pemesanan: req.params.id_pemesanan }

        detail_pemesanan.destroy({ where: params })
            .then(result => {
                if (result !== null) {
                    pemesanan.destroy({ where: params })
                        .then(results => res.json({ success: 1, message: 'Data has been deleted!' }))
                        .catch(err => res.json({ message: err.message }))
                }
            })
            .catch(err => res.json({ message: err.message }))
    } catch (err) {
        res.json({ message: err.message })
    }
});

module.exports = app;