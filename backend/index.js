const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const PORT = process.env.SERVER_PORT || 8000;

const user = require('./routes/user');
const kamar = require('./routes/kamar');
const pemesanan = require('./routes/pemesanan');
const tipe_kamar = require('./routes/tipe_kamar');
const detail_pemesanan = require('./routes/detail_pemesanan');
const filtering_kamar = require('./routes/filtering_kamar');


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'foto')));

app.use('/hotel/user', user);
app.use('/hotel/kamar', kamar);
app.use('/hotel/pemesanan', pemesanan);
app.use('/hotel/tipe_kamar', tipe_kamar);
app.use('/hotel/detail_pemesanan', detail_pemesanan);
app.use('/hotel/filtering', filtering_kamar);

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT} 🚀`));