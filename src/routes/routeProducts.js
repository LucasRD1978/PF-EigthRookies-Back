const express = require('express');
const {Products} =require('../db.js');
const axios = require('axios');
const { Router } = require('express');

const route = express.Router();
route.use(express.json());

// -------- Ruta Productos y detalle ------------------

route.get("/", (req, res) => {
    Products.findAll()
    .then(r => {
        res.send(r)
    })
    .catch((error) => {
        next();
    } )
})

//--------- Ruta Admin --------------------------------

// -----------RUTA NAME ------------------------------
// item.name.toLowerCase().includes(name.toLowerCase()))
route.get('/buscar', async(req,res,next)=>{
    const {name} = req.query
    const  productNew = await Products.findOne({
        where: {
            name: name
        }
    })
        if(productNew.length !== 0){
            res.json(productNew);
        } else {
            res.status(400).send({msg:"Name invalido"})
        }
    })

// ----------RUTA ID DETALLE _________________________________

route.get("/:id", async (req, res, next) => {
    const {id} = req.params;
    try{
    const prodBuscado = await Products.findByPk(id)
    if(prodBuscado.length !== 0){

        res.send(prodBuscado)
    } else {
        res.status(400).send("No se encontro la busqueda por id")
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