const jwt = require ('jsonwebtoken');
//comentario
require('dotenv').config();
const {
    jwtSecret, jwtAdmin
  } = process.env

const generateAccessToken = (user, idRol) => {
    if (idRol === 1) {
        try {
            const token = jwt.sign({ user }, jwtSecret, { expiresIn: '30m' });
            return token;
        }
        catch (err) {
            console.log(err);
        }
    }
    if (idRol === 2) {
        try {
            const token = jwt.sign({ user }, jwtAdmin, { expiresIn: '30m' });
            return token;
        }
        catch (err) {
            console.log(err);
        }
    }
};

module.exports = generateAccessToken;
