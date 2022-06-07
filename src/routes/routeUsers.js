const {Products, Category,User} =require('../db.js');
const axios = require('axios');
const { Router } = require('express');
const{Op}=require('sequelize')
const route = Router()

route.get('/',(req,res,next)=>{

    User.findAll()
    .then((r)=>{return res.status(200).send(r)})
    .catch(()=>next())

})
route.post('/',(req,res,next)=>{
    const{email,first_name,last_name,functions}=req.body
    if(!functions){functions='usuario'}
    User.findOrCreate({
        where:{
        email:email,
        first_name:first_name, 
        last_name:last_name,
        functions:functions
    }
    })
    .then(()=>{return res.status(200).send({msg:`${email}:${first_name}..creado`})})
    .catch(()=>next())
})


module.exports=route