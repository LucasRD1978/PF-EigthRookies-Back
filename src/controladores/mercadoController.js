const mercadopago = require('mercadopago');
require('dotenv').config();
const { TOKEN } = process.env;
// este código es copiado de mercadopago
const createOrder = async (req, res, next) => {

    const {carrito} = req.body

    // const carrito = [{ "title": "Producto 1", "quantity": 3, "price": 12.53 },
    // { "title": "Producto 2", "quantity": 1, "price": 5.25 },
    //     { "title": "Producto 3", "quantity": 5, "price": 21.15 }];

    mercadopago.configure({
        access_token: "TEST-1177109599618095-060917-b77e808d2e1e47d5d181d77ae7935bcc-1139977918"
    });

    const item_ml = carrito.map(item => ({
        title: item.title,
        unit_price: item.price,
        quantity: item.quantity,
    }));

    const preference = {
        items: item_ml,
        notification_url: "https://6fb7-190-188-237-242.sa.ngrok.io/notification"
    };

    mercadopago.preferences.create(preference)
       .then((response) => {
           res.status(200).json(response);
        })
       .catch((e) => {
           res.status(400).json(e);
           next()
       });
};

const orderNotification = async (req, res) => {
    const datos = req.query;

    console.log(datos);
    res.status(200);
};

module.exports = { createOrder, orderNotification };
