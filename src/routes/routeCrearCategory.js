const {Products, Category} =require('../db.js');
const axios = require('axios');
const { Router } = require('express');

const route = Router()

route.post('/',(req,res,next)=>{
    const{name}=req.body
    Category.findOrCreate({
        where:{name:name}
    })
    .then(()=> res.status(200).end())
    .catch(()=>next())
})

module.exports=route