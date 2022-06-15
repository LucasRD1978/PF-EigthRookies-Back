const {Products, Category,User,Order} =require('../db.js');
const axios = require('axios');
const { Router } = require('express');
const route = Router()



route.put('/:id',(req,res,next)=>{
    const{id}=req.params
    const{status}=req.body
    console.log("algo")
    console.log(status)
    console.log(id)
    Order.update({
        status:status
    },{
        where:{id:id*1}
    })
    .then(()=>{return res.status(200)})
    .catch(()=>next())
})


module.exports=route
