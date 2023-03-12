const express = require('express');

const auth = require('../middleware/auth');
const pemesanan = require('../models/index').pemesanan;
const detail_pemesanan = require('../models/index').detail_pemesanan;

const app = express();

/**
 * @apiRoutes {get} /hotel/booking/detail/:id
 * @apiName GetDetailBookingById
 * @apiGroup Booking
 * @apiDescription Get detail booking data by id
 */
app.get('/:id', auth, async (req, res) => {
    let params = { id_pemesanan: req.params.id };

    await detail_pemesanan.findAll({ where: params, include: ['kamar'] })
        .then(result => res.json({ data: result }))
        .catch(error => res.json({ message: error.message }))
});

module.exports = app;
