const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const{Products,Categories}=require('../db')

const router = Router();

router.get('/',(req,res,next)=>{
    Products.findAll()
    .then((r)=>{return res.send(r)})
    .catch(()=>next())
})

module.exports=router


