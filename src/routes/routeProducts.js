const express = require('express');
const {Products,Category} =require('../db.js');
const axios = require('axios');
const { Router } = require('express');
const { Op } = require('sequelize');

const route = express.Router();
route.use(express.json());

// -------- Ruta Productos y detalle ------------------

route.get("/", (req, res,next) => {
    Products.findAll({include:[Category]})
    .then(r => {
        res.send(r)
    })
    .catch(() => {
        next();
    } )
})


// -----------RUTA NAME ------------------------------
// item.name.toLowerCase().includes(name.toLowerCase()))
route.get('/search', async(req,res,next)=>{
    const {name} = req.query

    
    const  productNew = await Products.findOne({

        where: {
            name: {
                [Op.like] : '%'+name+'%'
            }
        }
    })
        if(productNew.length === 0){
            res.status(400).send("Invalid name")
        } else {
            res.send(productNew);
        }
    } catch(error){
        next(error);
    }
    })

// ----------RUTA ID DETALLE _________________________________

route.get("/:id", async (req, res, next) => {
    const {id} = req.params;
    try{
    const prodBuscado = await Products.findByPk(id)
    if(!prodBuscado){

        res.status(400).send("No se encontro la busqueda por id")
    } else {
        res.send(prodBuscado)
    }
} catch(error){
    console.log("No se encontro el ID")
    next(error)
}
    

})

module.exports = route;

/*
la de los productos, 
*la product detail 
*desde el lado del adm para editar/eliminar productos
*/