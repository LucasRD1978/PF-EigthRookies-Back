const server = require('./src/app.js');
const { conn } = require('./src/db.js');

const{CargarTodo}=require('./src/controladores/cargaProductosBDv1')
const{cargarUsuario,arrObj}=require('./src/controladores/cargarAdmin')

  conn.sync({ force: true }).then(() => {
  server.listen(3001, async () => { 
    console.log('%s listening at 3001'); // eslint-disable-line no-console

    CargarTodo();
    cargarUsuario(arrObj)

  });
});
