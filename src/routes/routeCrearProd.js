const {Products, Category} =require('../db.js');
const axios = require('axios');
const { Router } = require('express');
const authorization = require('../controladores/middleware/authorization')

const route = Router()


route.post('/',async(req,res,next)=>{
    let{name,price, description,image,image2,image3, image4,category, amount}=req.body
    if(!image2){image2=""}
    if(!image3){image3=""}
    if(!image4){image4=""}

    try{
    let p=await Products.findOrCreate({
        where:{
            name:name,
            price:price,
            description:description,
            image:image,
            image2:image2,
            image3:image3,
            image4:image4,
            amount: amount

        }
    })
    let c=await Category.findOne({
        where:{id:category*1}
    })
        if(c&&p){
            c.addProducts(p[0])
            return res.status(200).send({msg:'operacion exitosa'})    
    }else{return res.status(404).send({msg:'algo salio mal'})}

}
catch(err){res.status(400).send({msg:'algo salio mal'}).end()}
})


module.exports=route
