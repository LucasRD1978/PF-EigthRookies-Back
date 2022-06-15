const express = require('express');
const {Products,Category} =require('../db.js');
const axios = require('axios');
const { Router } = require('express');


const route = express.Router();
route.use(express.json());

route.get("/", async (req, res) => {
    Category.findAll().
    then(r => {
        res.send(r)
    }).catch((error) =>
        next(error)
    )
})

route.get("/:id", async (req, res, next) => {
    const {id} =req.params;
    try {
        
        const idCategorySearched = await Category.findOne({
            where: {
                id:id
            }, include: [Products]
        })
        if(!idCategorySearched){
            res.status(400).send({msg:"id not found"})
        }else{

            res.status(200).send(idCategorySearched)
        }
    
    } catch (error) {
        return res.status(400).send({ msg: "ID not was found" })
    }
})

module.exports = route;
