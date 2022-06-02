const jwt = require ('jsonwebtoken');
require("dotenv").config();
const { jwtAdmin } = process.env

module.exports = function (req, res, next){
    try{
    const token = req.header('token')

    if(!token){
        return res.status(403).json('Not Authorized')
    }

        const jw = jwt.verify(token, jwtAdmin)
    
    req.user = jw.user

    next()
    
    }
    catch (error){
        return res.status(410).json('Not Authorized')
    }  
    

}
