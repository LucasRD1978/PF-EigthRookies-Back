const jwt = require ('jsonwebtoken');
require("dotenv").config();
const {jwtSecret} = process.env

module.exports = function (req, res, next){
    try{
    const token = req.header('token')

    if(!token){
        return res.status(403).json('Not Authorized')
    }

    const jw =  jwt.veryfy(token, jwtSecret)
    
    req.user = jw.user

    next()
    
    }
    catch (error){
        return res.satus(410).json('Not Authorized')
    }  
    

}