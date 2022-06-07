const jwt = require ('jsonwebtoken');
//comentario
require('dotenv').config();
const {
    jwtSecret, jwtAdmin
  } = process.env


const generateAccessToken = (user) => {
    
    try{
    const token = jwt.sign({user}, jwtSecret, {expiresIn: '30m'});
    return token;

    }catch (err) {
            console.log(err);
    }
    
};

module.exports = generateAccessToken;
