const express = require('express');
const {Products, Category} =require('../db.js');
const axios = require('axios');
const { Router } = require('express');

const route = express.Router();
route.use(express.json());

//-------RUTA CREACIÖN---------------------------------
route.post("/", async (req, res) => {
    const {name, description, price, image1, categories} = req.body;
    if(!name || !price){
        return res.json({msg:"The name, description and the price are required to create a new product"})
    }

    const prodCreated = await Products.create({name, description, price, image1
    })

    let categoryDb = await Category.findAll({
        where: {
            name: categories
        }
    })
    prodCreated.addCategory(categoryDb);

    res.send("A new product was created")
})

module.exports = route;