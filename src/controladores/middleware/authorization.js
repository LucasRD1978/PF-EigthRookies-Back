require("dotenv").config();
const jwt = require('jsonwebtoken');
const { jwtSecret } = process.env

module.exports = async function (req, res, next){
    try{
    const token = req.header('token')

    if(!token){
        return res.status(403).json('Not Authorized')
        }

        const jw = jwt.verify(token, jwtSecret)
    req.user = jw.user

    } catch (error) {
        return res.status(403).json('Not Authorized')
    }  
}
