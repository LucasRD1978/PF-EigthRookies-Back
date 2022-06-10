const express = require('express');
const { User, Rol, Cities, ShoppingCar } = require('../db.js');
const axios = require('axios');
const { Router } = require('express');
const bcrypt = require('bcrypt');
const generatorToken = require('../controladores/util/generateToken.js')
const authorization = require('../controladores/middleware/authorization');
const { redirect } = require('express/lib/response');

//otros comments

const route = express.Router();
route.use(express.json());

//------------------------------ROUTE USER LIST  -----------------

route.get("/userList", authorization, (req, res) => {

    User.findAll({
        include: 'scope'
    })
        .then(r => {
            res.send(r);
        })
        .catch((error) => {
            res.json({ error: error });
        });
});
//------------------------------ REGISTRY ROUTE --------------------

route.post("/register", async (req, res) => {
    try {
        let { email, first_name, last_name, image, phone, postal_code, address } = req.body;
        if (!email || !first_name) {
            return res.json({ msg: "The name and the email are required to create a new user" });
        }

    const user = await User.findOne({
    
        where: {
            email: email
        },
         include:{
             model: ShoppingCar
         }})
    //console.log(user.dataValues.functions)
   
   
    if(!user) {
        let nameCreated = await User.create({email, first_name, last_name ,image, phone, postal_code, address
        })
        const token = generatorToken(nameCreated);
        res.json({token, nameCreated});
    } else {
        
        if(user.dataValues.functions==='banned'){return res.send('banned')}
        else{
        const token = generatorToken(user);
        return res.status(201).json({token, user})}
        
    }

        if (!user) {
            let nameCreated = await User.create({
                email, first_name, last_name, image, phone, postal_code, address
            });
            const token = generatorToken(nameCreated);
            res.json({ token, nameCreated });
        } else {

            const token = generatorToken(user);
            return res.status(201).json({ token, user });

        }

    } catch (error) {
        console.log(error);
        res.status(400).send({ msg: "Error creating a user" });
    }
});
//-------------------------------------ROUTE LOGIN --------------------

route.post("/login", async (req, res) => {
    const {email, name} = req.body;
    const user = await User.findOne({where: {email: email}})
   // console.log(user);
    if(user.functions==='banned'){return res.status(404).end()}
    if(!user) return res.status(401).send({msg:"Name or email is incorrect"})
   
   
        const token = generatorToken(user.id)

        res.json({token})
})

module.exports = route;
