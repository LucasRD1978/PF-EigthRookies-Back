const jwt = require ('jsonwebtoken');

require ('dotenv').config();

const generateAccessToken = (user) => {
    try{
    const token = jwt.sing({user}, procces.env.jwtSecret, {expired: '30m'});
    return token;
    }
    catch(err){
        console.log(err)
    }
};

module.exports = generateAccessToken;