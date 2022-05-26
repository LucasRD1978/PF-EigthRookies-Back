
const {Products, Category} =require('../db.js');
const axios = require('axios');
const { Router } = require('express');

const route = Router()

route.get('/name/:condicion',(req,res,next)=>{
    const{condicion}=req.params
    if(condicion==="ASC"){
        Products.findAll({
            
            order:[["name","ASC"]]})
    
    .then((r)=>res.status(200).send(r))
    .catch(()=>next())
    }
    if(condicion==="DESC"){
    Products.findAll({
        order:[["name","DESC"]]
    })
    .then((r)=>res.status(200).send(r))
    .catch(()=>next())
    }
})
route.get('/price/:condicion',(req,res,next)=>{
    const{condicion}=req.params
    if(condicion==="ASC"){
        Products.findAll({
            order:[["price","ASC"]]
        })
        .then((r)=>res.send(r).status(200))
        .catch(()=>next())
    }
    if(condicion==="DESC"){
        Products.findAll({
            order:[["price","DESC"]]
        })
        .then((r)=>res.status(200).send(r))
        .catch(()=>next())
    }
})



module.exports=route