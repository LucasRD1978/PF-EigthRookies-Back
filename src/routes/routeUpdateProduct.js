const {Products, Category} =require('../db.js');
const axios = require('axios');
const { Router } = require('express');
const route = Router()

route.put('/:id',(req,res,next)=>{
    const{id}=req.params
    let{name,price, description,image,image2,image3, image4,category,amount}=req.body
    if(!image2){image2=""}
    if(!image3){image3=""}
    if(!image4){image4=""}
    Products.update({
        name:name,
        price:price*1,
        description:description,
        image:image,
        image2:image2,
        image3:image3,
        image4:image4,
        amount:amount*1,

    },{
        where:{id:id}
    })
    .then(async(r)=>{
      let p=await Products.findOne({where:{id:id}})  
      let c=await Category.findOne({where:{id:category}})
            c.addProducts(p)
        res.status(200).end()
    })
    .catch(()=>next())

})



module.exports=route