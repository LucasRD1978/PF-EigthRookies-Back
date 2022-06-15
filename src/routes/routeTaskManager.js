const {Products, Category,User,Order} =require('../db.js');
const axios = require('axios');
const { Router } = require('express');
const route = Router()

route.get('/',(req,res,next)=>{
    const{user}=req.query
    Order.findAll({
       // where:{status:'inCart'},
         include:[{
            
             model:User,
            }]
        })
            

        // }]
    
    .then((r)=>res.send(r))
    .catch(()=>next())
})



module.exports=route