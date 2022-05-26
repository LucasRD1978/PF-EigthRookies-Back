const {Products, Category} =require('../db.js');
const axios = require('axios');
const { Router } = require('express');
const{Op}=require('sequelize')
const route = Router()

route.get('/price/:rango',(req,res,next)=>{
    console.log('pego')
    let{rango}=req.params
    
    Products.findAll({
        where:{
            price:{
            [Op.gt]:[rango*1-500],
            [Op.lt]:[rango*1+500]
            
            }
        }
    })
    .then((r)=>res.status(200).send(r))
    .catch(()=>next())
})



module.exports=route