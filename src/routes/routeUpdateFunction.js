const {User} =require('../db.js');
const axios = require('axios');
const { Router } = require('express');

const route = Router()

route.put('/:id',(req,res,next)=>{
    console.log(req.body)
    const{id}=req.params
    const{newfunctions}=req.body
    User.update({
        functions:newfunctions
    },{
        where:{email:id}
    })
    .then(()=>{
        return res.status(200).send({msg:'actualizando function'})
    })
    .catch(()=>next())

})






module.exports=route