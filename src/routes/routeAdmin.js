const express = require('express');
const {Products,Categories} =require('../db.js');
const axios = require('axios');
const { Router } = require('express');

const route = express.Router();
route.use(express.json());

//-------RUTA CREACIÖN---------------------------------
route.post("/", async (req, res) => {
    try{
    const {name, description, price, image, categories} = req.body;
    if(!name || !price){
        return res.json({msg:"The name, description and the price are required to create a new product"})
    }

    const prodCreated = await Products.create({name, description, price, image
    })

    let categoryDb = await Categories.create({
        where: {
            name: categories
        }
    })
    prodCreated.addCategories(categoryDb);

    res.send("A new product was created")
  }catch(error){
      console.log(error)
  }
})

module.exports = route;