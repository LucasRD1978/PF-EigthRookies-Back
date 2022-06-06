const { Cities, Province} = require('../db.js');

function asociacion (array) {
    array.map(async (e) =>{
        let p = await Cities.findOne({where:{id: e.id}})
        let c = await Province.findOrCreate({where:{cities: e.province}})
    })
};


module.exports = {asociacion}