const express = require('express');
const cors = require('cors');
const app = express();

const user = require('./routes/user');
const kamar = require('./routes/kamar');
const pemesanan = require('./routes/pemesanan');
const tipe_kamar = require('./routes/tipe_kamar');
const detail_pemesanan = require('./routes/detail_pemesanan');

app.use(cors());
app.use('/hotel/user', user);
app.use('/hotel/kamar', kamar);
app.use('/hotel/pemesanan', pemesanan);
app.use('/hotel/tipe_kamar', tipe_kamar);
app.use('/hotel/detail_pemesanan', detail_pemesanan);

app.listen(8000, () => console.log('Server started on http://localhost:8000 🚀'));