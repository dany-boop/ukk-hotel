const express = require('express');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const SECRET_KEY = process.env.SECRET_KEY;

const auth = require('../middleware/auth');
const user = require('../models/index').user;
const upload = require('../middleware/imageUser');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**
 * @apiRoutes {get} /hotel/user/
 * @apiName GetAllUsers
 * @apiGroup User
 * @apiDescription Get all users data
 */
app.get('/', auth, async (req, res) => {
    await user.findAll()
        .then(result => res.json({ data: result }))
        .catch(error => res.json({ message: error.message }))
});

/**
 * @apiRoutes {get} /hotel/user/:id
 * @apiName GetUsersById
 * @apiGroup User
 * @apiDescription Get users data by id
 */
app.get('/:id', auth, async (req, res) => {
    let params = { id_user: req.params.id };

    await user.findOne({ where: params })
        .then(result => res.json({ data: result }))
        .catch(error => res.json({ message: error.message }))
});

/**
 * @apiRoutes {post} /hotel/user/
 * @apiName PostUser
 * @apiGroup User
 * @apiDescription Insert user data
 */
app.post('/', upload.uploadImage.single(`foto`), async (req, res) => {
    let data = {
        nama_user: req.body.nama_user,
        foto: req.file.filename,
        email: req.body.email,
        password: md5(req.body.password),
        role: req.body.role
    }

    await user.create(data)
        .then(result => res.json({ success: 1, message: "Data has been inserted", data: result }))
        .catch(error => res.json({ message: error.message }))
});

/**
 * @apiRoutes {put} /hotel/user/
 * @apiName PutUser
 * @apiGroup User
 * @apiDescription Update user data
 */
app.put('/', upload.uploadImage.single(`foto`), auth, async (req, res) => {
    let params = { id_user: req.body.id_user }
    let data = {
        nama_user: req.body.nama_user,
        email: req.body.email,
        password: md5(req.body.password),
        role: req.body.role
    }

    if (req.file) {
        let oldImg = await user.findOne({ where: params });
        let oldImgName = oldImg.foto;

        let loc = path.join(__dirname, '../foto/', oldImgName);
        fs.unlink(loc, (err) => console.log(err));

        data.foto = req.file.filename;
    }

    await user.update(data, { where: params })
        .then(result => res.json({ success: 1, message: "Data has been updated" }))
        .catch(error => res.json({ message: error.message }))
});

/**
 * @apiRoutes {delete} /hotel/user/:id
 * @apiName DeleteUser
 * @apiGroup User
 * @apiDescription Delete user data
 */
app.delete('/:id', auth, async (req, res) => {
    let params = { id_user: req.params.id }

    let delImg = await user.findOne({ where: params });
    if (delImg) {
        let delImgName = delImg.foto;
        let loc = path.join(__dirname, '../resource/usr/', delImgName);
        fs.unlink(loc, (err) => console.log(err));
    }

    await user.destroy({ where: params })
        .then(result => res.json({ success: 1, message: "Data has been deleted" }))
        .catch(error => res.json({ message: error.message }))
});

/**
 * @apiRoutes {post} /hotel/user/admin
 * @apiName LoginUserAdmin
 * @apiGroup User
 * @apiDescription Login user admin
 */
app.post('/admin', async (req, res) => {
    let params = {
        email: req.body.email,
        password: md5(req.body.password),
        role: 'admin'
    }

    await user.findOne({ where: params })
        .then(result => {
            if (result) {
                let payload = JSON.stringify(result);
                let token = jwt.sign(payload, SECRET_KEY);
                res.json({ success: 1, message: "Login success, welcome back!", token: token })
            } else {
                res.json({ success: 0, message: "Invalid email or password!" })
            }
        })
        .catch(error => res.json({ message: error.message }))
});

/**
 * @apiRoutes {post} /hotel/user/resepsionis
 * @apiName LoginUserResepsionis
 * @apiGroup User
 * @apiDescription Login user resepsionis
 */
app.post('/resepsionis', async (req, res) => {
    let params = {
        email: req.body.email,
        password: md5(req.body.password),
        role: 'resepsionis'
    }

    await user.findOne({ where: params })
        .then(result => {
            if (result) {
                let payload = JSON.stringify(result);
                let token = jwt.sign(payload, SECRET_KEY);
                res.json({ success: 1, message: "Login success, welcome back!", token: token })
            } else {
                res.json({ success: 0, message: "Invalid email or password!" })
            }
        })
        .catch(error => res.json({ message: error.message }))
});

module.exports = app;