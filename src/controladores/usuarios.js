const {Rol} = require('../db');

async function usuariosDb (){ 
    await Rol.bulkCreate([
    {type:'cliente'},
    {type:'administrador'}
  ])
}

module.exports = {usuariosDb};

