const express = require('express');
const { Router } = require('express');
const axios = require('axios');
const { ACCESS_TOKEN } = process.env;

const route = Router();
route.use(express.json());


route.get('/:payments_id', (req, res) => {
    const { payments_id } = req.params;

    axios({
        method: 'get',
        url: `https://api.mercadopago.com/v1/payments/${payments_id}`,
        headers: { Authorization: 'Bearer ' + ACCESS_TOKEN }
    }).then((r) => {
        const formatInfo = {
            products: r.data.additional_info.items,
            date: r.data.date_approved,
            status: r.data.status,
            fullPrice: r.data.transaction_amount,
        };
        res.status(200).send(formatInfo);
    });

});

module.exports = route;
