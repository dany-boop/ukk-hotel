const jwt = require('jsonwebtoken');
const SECRET_KEY = 'hotelmahal';

auth = (req, res, next) => {
    let header = req.headers.authorization
    let token = header && header.split(' ')[1]


    let jwtHeader = {
        algorithm: "HS256"
    };

    console.log(header);

    if (token == null) return res.sendStatus(401).json({ message: "Unauthorized" });

    jwt.verify(token, SECRET_KEY, jwtHeader, (err, usr) => {
        if (err) return res.sendStatus(401).json({ message: "Invalid Token" });

        req.user = usr;
        console.log(req.user);
        next();
    });
};



module.exports = auth;