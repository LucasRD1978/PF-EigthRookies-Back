const server = require('./src/app.js');
const { conn } = require('./src/db.js');
//const{cargarElectronicaEnDb,cargarCeluraresEnBd}=require('./src/controladores/cargarProductosBD')
// Syncing all the models at once.
const{CargarTodo}=require('./src/controladores/cargaProductosBDv1')
  conn.sync({ force: true }).then(() => {
  server.listen(3001,() => { 
  console.log('%s listening at 3001'); // eslint-disable-line no-console
  //cargarCeluraresEnBd();
  //cargarElectronicaEnDb();
  CargarTodo()
    
  });
  
});


