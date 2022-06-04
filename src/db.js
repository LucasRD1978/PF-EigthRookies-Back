require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/eightrookies`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring


const { Products, Category, User, ShoppingCar, Sales, Buy, PriceRange, Rol, PaymenthMethod,
  CommercialInvoiceType, Cities, Province, Order } = sequelize.models;

Category.hasMany(Products);
Products.belongsTo(Category);

User.hasMany(ShoppingCar);
ShoppingCar.belongsTo(User);

Products.hasMany(ShoppingCar);
ShoppingCar.belongsTo(Products);

ShoppingCar.hasMany(Sales);
Sales.belongsTo(ShoppingCar);

Products.hasMany(Buy);
Buy.belongsTo(Products);

PriceRange.hasMany(Products);
Products.belongsTo(PriceRange);

Rol.hasMany(User, {foreignKey: 'idRol'});
User.belongsTo(Rol, {as: 'scope' ,foreignKey: 'idRol'});

PaymenthMethod.hasMany(Sales);
Sales.belongsTo(PaymenthMethod);

CommercialInvoiceType.hasMany(Sales);
Sales.belongsTo(CommercialInvoiceType);

CommercialInvoiceType.hasMany(Buy);
Buy.belongsTo(CommercialInvoiceType);

Cities.hasMany(User);
User.belongsTo(Cities);

Province.hasMany(Cities);
Cities.belongsTo(Province);

Order.belongsTo(User);
User.hasMany(Order);


// Aca vendrian las relaciones
// Product.hasMany(Reviews);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
