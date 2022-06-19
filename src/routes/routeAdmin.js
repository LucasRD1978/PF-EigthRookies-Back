const express = require('express');
const { User, ShoppingCar } = require('../db.js');
const { Router } = require('express');
const generatorToken = require('../controladores/util/generateToken.js');
const authorization = require('../controladores/middleware/authorization');
const { sendEmailWelcome } = require('../controladores/util/sendEmail')


const route = Router();
route.use(express.json());

//------------------------------ROUTE USER LIST  -----------------

route.get("/userList", authorization, (req, res) => {

    User.findAll({
        include: {
            model: ShoppingCar
        }
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
        const { email, first_name, last_name, image, phone, postal_code, address } = req.body;
        if (!email || !first_name) {
            return res.json({ msg: "The name and the email are required to create a new user" });
        }


    let user = await User.findOne({
    
        where: {
            email: email
        },
         include:{
             model: ShoppingCar
        }
    })
   
   
    if(!user) {
        user = await User.create({email, first_name, last_name ,image, phone, postal_code, address
        })

        sendEmailWelcome(email)
        const token = generatorToken(user);
        res.json({ token, user });

    } else {
        
        if (user.dataValues.functions === 'banned') {
            return res.send('banned');
        } else {
        const token = generatorToken(user);
            return res.status(201).json({ token, user });
        }    
    }
    } catch (error) {
        console.log(error);
        res.status(400).send({ msg: "Error creating a user" });
    }
});

module.exports = route;
