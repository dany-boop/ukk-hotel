const express = require('express');
const cors = require('cors');
const app = express();

const user = require('./routes/user');

app.use(cors());
app.use('/hotel/user', user);

app.listen(8000, () => console.log('Server started on http://localhost:8000 🚀'));