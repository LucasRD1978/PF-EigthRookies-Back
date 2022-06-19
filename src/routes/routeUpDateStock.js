const {Products, Category} =require('../db.js');
const axios = require('axios');
const { Router } = require('express');

const route = Router()

route.put('/:id',async(req,res,next)=>{
    const{id}=req.params
    const{Quantity}=req.body
    let p=await Products.findOne({
        where:{id:id}
    })
    let amount=await p.amount
    await Products.update({

        amount:(amount*1-Quantity*1)>0?amount*1-Quantity*1:0
},{where:{id:id}})
  
    

})



module.exports=route