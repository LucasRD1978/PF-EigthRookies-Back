const express = require('express');
const {User} =require('../db.js');
const axios = require('axios');
const { Router } = require('express');
const { ROWLOCK } = require('sequelize/types/table-hints');

const route = express.Router();
route.use(express.json());

//-------RUTA CREACIÖN---------------------------------
route.get("/", (req, res) => {
    User.findAll()
    .then(r => {
        res.send(r)
    })
    .catch(() => {
        next();
    } )
})


route.post("/", async (req, res) => {
    try{
    let {email, first_name, last_name ,image, password, phone, postal_code, address, admin, cities } = req.body;
    if(!email || !first_name || !last_name){
        return res.json({msg:"The name, surname and the mail are required to create a new user"})
    }

    let nameCreated = await User.create({email, first_name, last_name ,image, password, phone, postal_code, address
    })

    let adminDb = await Rol.findAll({
        where: {
            type: admin
        }
    })

    let cityDb = await Cities.findAll({
        where: {
            cities: cities
        }
    })

    nameCreated.addRol(adminDb);

    if(nameCreated !== 0){
    return res.status(200).send({msg:"A new user was created"})
    }
} catch(error){
    //console.log(error)
    res.status(400).send({msg:"Error creating a user"})
}
})

module.exports = route;