const express = require('express');
const {User, Rol, Cities} =require('../db.js');
const axios = require('axios');
const { Router } = require('express');
//const { where } = require('sequelize/types');


const route = express.Router();
route.use(express.json());

//-------RUTA LISTA DE USUARIOS---------------------------------
route.get("/userList", (req, res) => {
    User.findAll({
        include: 'scope'
    })
    .then(r => {
        res.send(r)
    })
    .catch((error) => {
        res.json({error: error})
    } )
})


route.post("/register", async (req, res) => {
    try{
    let {email, first_name, last_name ,image, password, phone, postal_code, address, idRol } = req.body;
    if(!email || !first_name || !last_name){
        return res.json({msg:"The name, surname and the mail are required to create a new user"})
    }

    let nameCreated = await User.create({email, first_name, last_name ,image, password, phone, postal_code, address, idRol
    })
    
    if(nameCreated !== 0){
    return res.status(200).send({msg:"A new user was created"})
    }
} catch(error){
    console.log(error)
    res.status(400).send({msg:"Error creating a user"})
}
})

module.exports = route;