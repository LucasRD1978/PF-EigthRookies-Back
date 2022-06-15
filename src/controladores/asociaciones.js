const { Products, Category } = require('../db.js');


function asociar(array) {
    array.map(async (e) => {
        let p = await Products.findOne({ where: { id: e.id } });
        if (!p) { console.log(p); }
        let c = await Category.findOrCreate({ where: { name: e.category } });
        c[0].addProducts(p);
    });
}

module.exports = { asociar };
