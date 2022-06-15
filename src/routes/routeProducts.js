const express = require('express');
const {Products,Category, Review} =require('../db.js');
const axios = require('axios');
const { Router } = require('express');
const {Op} = require('sequelize');

const route = express.Router();
route.use(express.json());

// -------- RUTA PRODUCTOS ------------------

route.get("/", (req, res,next) => {
    Products.findAll({include:[{model:Category}, {model: Review}]})
    .then(r => {
        res.send(r)
    })
    .catch(() => {
        next();
    } )
})


// -----------RUTA NAME "CASE INSENSITIVE "------------------------------

route.get('/search', async(req,res,next)=>{
    const {name} = req.query
    try{
    const  productNew = await Products.findAll({
        where: {
            name: {
                [Op.iLike]: '%'+`${name.split(' ').join('-')}`+'%'
            }
        }, include: [Category]
    })
        if(productNew.length === 0){
            res.status(400).send({msg:`there are no results for the ${name} search`})
        } else {
            res.send(productNew);
        }
    }catch(error){
        next(error)
    }
    })

// ----------RUTA ID DETALLE _________________________________

route.get("/:id", async (req, res) => {
    const {id} = req.params;
    try{
    const prodBuscado = await Products.findOne({
        where: {
            id: id
        }, include:[{model:Category}, {model: Review}]
    })
    if(!prodBuscado){

        res.status(400).send({msg:"the searched ID did not return any results"})
    } else {
        res.send(prodBuscado)
    }
} catch(error){
    console.log("ID not found")
    next(error)
}
    

})

module.exports = route;

/*
la de los productos, 
*la product detail 
*desde el lado del adm para editar/eliminar productos
*/