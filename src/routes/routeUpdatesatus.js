const { Products, Category, User, Order } = require('../db.js');
const { Router } = require('express');
const route = Router()



route.put('/:id',(req,res,next)=>{
    const{id}=req.params
    const{status}=req.body

    Order.update({
        status:status
    },{
        where:{id:id*1}
    })
    .then(()=>{return res.status(200)})
    .catch(()=>next())
})


module.exports=route
