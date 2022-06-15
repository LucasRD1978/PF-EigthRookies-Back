const { Products, Category } = require('../db.js');
const { Router } = require('express');

const route = Router()

route.put('/:id',(req,res,next)=>{
    const{id}=req.params
    const{amount,purchaseQuantity}=req.body
    Products.update({

        cantidad:amount*1-purchaseQuantity*1
},{where:{id:id}})
  
    .then(()=>{res.send({msg:'stock isUpdate'})})
    .catch(()=>next())

})



module.exports=route
