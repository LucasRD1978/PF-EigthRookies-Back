require('dotenv').config();
const jwt = require ('jsonwebtoken');
const { jwtSecret } = process.env

const generateAccessToken = (user) => {
    
    try{
      const token = jwt.sign({ user }, jwtSecret, { expiresIn: '45m' });
    return token;

    }catch (err) {
            console.log(err);
    }
    
};

module.exports = generateAccessToken;
