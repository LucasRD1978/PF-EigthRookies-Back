const mercadopago = require('mercadopago');
require('dotenv').config();
const { ACCESS_TOKEN } = process.env;
const { redirect } = require('express/lib/response');
const { User, ShoppingCar } = require('../db');
const { json } = require('body-parser');

const createOrder = async (req, res, next) => {

    const { carrito } = req.body;

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
            success: 'http://localhost:3000/'
        }
    };

    mercadopago.preferences.create(preference)
        .then((data) => {
            res.status(200).send({ url: data.response.init_point }); //url de mercado pago
        })
        .catch((e) => {
            res.status(400).json(e);
            next();
        });
};


const handleStatus = async (req, res, next) => {

    const status = req.query;
    console.log(status);

    try {

        await ShoppingCar.create({
            status: status.status,
            payment_id: status.payment_id,
            payment_type: status.payment_type,
            merchant_order_id: status.merchant_order_id

        });
        res.redirect('http://localhost:3000');

    } catch (error) {
        console.error(error);
        next();
    }
};

module.exports = { createOrder, handleStatus };
