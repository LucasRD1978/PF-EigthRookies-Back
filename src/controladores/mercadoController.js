const mercadopago = require('mercadopago');
require('dotenv').config();
const { ACCESS_TOKEN } = process.env;
const { redirect } = require('express/lib/response');
const { User, ShoppingCar } = require('../db');
const { json } = require('body-parser');

const createOrder = async (req, res, next) => {

    const {carrito} = req.body

    mercadopago.configure({
        access_token: ACCESS_TOKEN
    });

    const allProducts = carrito.map(item => ({
        title: item.title,
        unit_price: item.price,
        quantity: item.quantity,
    }));

    const preference = {
        items: allProducts,
        auto_return: 'approved',
        back_urls: {
            failure: 'http://localhost:3001/mercadopay/status',
            pending: 'http://localhost:3001/mercadopay/status',
            success: 'http://localhost:3001/mercadopay/status'
        }
    };

    mercadopago.preferences.create(preference)
        .then((data) => {
            res.status(200).send({ url: data.response.init_point }); //url de mercado pago
        })
       .catch((e) => {
           res.status(400).json(e);
           next()
       });
};

const handleStatus = async (req, res, next) => {
    const status = req.query;

    try {

        res.status(200).json(status)
        /* const cart = json(status);

const cartPay = await ShoppingCar.create({
    status: cart.status,
    payment_id: cart.payment_id,
    payment_type: cart.payment_type
});

res.redirect('http://localhost:3000/login'); */

    } catch (error) {
        console.error(error);
        next();
    }
};


module.exports = { createOrder, handleStatus };
