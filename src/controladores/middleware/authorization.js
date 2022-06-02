const jwt = require ('jsonwebtoken');
require("dotenv").config();
const {jwtSecret} = process.env
const {User} = require('../../models/User');

module.exports = async function (req, res, next){
    try{
    const token = req.header('token')

    if(!token){
        return res.status(403).json('Not Authorized')
    }

    const jw =  jwt.verify(token, jwtSecret)
    
    req.user = jw.user

    console.log(req.user)
     if(req.user.idRol === 2) return next();
     else return res.status(403).send("Fuera de aqui intruso");
      
    //next()
    
}
    catch (error){
        return res.status(403).json('Not Authorized')
    }  
    

}