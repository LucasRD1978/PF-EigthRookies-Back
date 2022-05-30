const {Products, Category} =require('../db.js');
const axios = require('axios');
const { Router } = require('express');

const route = Router()

route.put('/:numeroPagina',(req,res,next)=>{
    //let  estadoArray=[1,2,3,4,5,6,7,8,9,10,11,12,13]
    const{numeroPagina}=req.params
    const{estadoArray}=req.body
    let cantidadEnVista=3
    let fin=cantidadEnVista*numeroPagina
    let mostrar=estadoArray.slice(fin-cantidadEnVista,fin)
    return res.send(mostrar)


})



module.exports=route