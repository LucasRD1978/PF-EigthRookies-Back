const server = require('./src/app.js');
const { conn } = require('./src/db.js');

const{CargarTodo}=require('./src/controladores/cargaProductosBDv1')
const { cargarUsuario, arrObj } = require('./src/controladores/cargarAdmin')
const PORT = process.env.PORT || 3001

conn.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log(`Server at on port ${PORT}`); // eslint-disable-line no-console
    CargarTodo()
    cargarUsuario(arrObj)
  });
});
