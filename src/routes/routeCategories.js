const express = require('express');
const {Categories} =require('../db.js');
const axios = require('axios');
const { Router } = require('express');
const {Op} = require('sequelize');

const route = express.Router();
route.use(express.json());

//----------- Rutas Categories ------------------------

route.get("/", (req, res, next) => {
    Categories.findAll().
    then(r => {
        res.send(r)
    }).catch( error => {
        next();
    })
})

route.get("/search", async (req, res, next) => {
    const {name} = req.query
    try{
    const  searchCategory = await Categories.findAll({
        where: {
            name: {
                [Op.like]: '%'+name.toUpperCase()+'%'
            }
        }
    })
        if(searchCategory.length !== 0){
            res.json(searchCategory);
        } else {
            res.status(400).send({msg:"Name invalido"})
        }
    } catch (erro){
        next(error);
    }
})

module.exports = route;