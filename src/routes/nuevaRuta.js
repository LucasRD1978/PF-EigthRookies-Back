const { Products, Category } = require('../db.js');
const { Router } = require('express');
const{Op}=require('sequelize')
const route = Router()

route.put('/:page',(req,res,next)=>{

    const{page}=req.params
    const{category,price}=req.body
    if(category&&price){
    Products.findAll({
            where:{price:{ [Op.gt]:[price*1],
                [Op.lt]:[price*1+5000]}},

                offset:page*10+10,

                limit:10,
                include:[{
                model:Category,
                where:{id:category*1}
                }]
    }).then((r)=>{return res.status(200).send(r)})
    .catch(()=>next())
    }
    else if(category&&!price){
        Products.findAll({
            include:[{

                offset:page*10+10,

                limit:10,
                model:Category,
                where:{id:category*1}
            }]
        })
        .then((r)=>{return res.send(r)})
        .catch(()=>next())
    }
    else if(!category&&price){
        Products.findAll({

            offset:page*10+10,

            limit: 10,
            where:{price:{[Op.gt]:[price*1-5000],
                [Op.lt]:[price*1+5000]}}
        })
        .then((r)=>{return res.status(200).send(r)})
        .catch(()=>next())
    } 
    Products.findAll({

        offset: page * 10 + 10,
        limit: 10,
    })
    .then((r)=>{return res.status(200).send(r)})
        .catch(() => next());
})

module.exports=route
