const Sequelize = require('sequelize');

const UsuarioEntidad = require('./Entidades/usuario');

const sequelize = new Sequelize('machineStore', 'vps', 'admin', {
    host: '186.182.43.139',
    dialect: 'mysql'
});

const Usuario = UsuarioEntidad(sequelize, Sequelize);

sequelize.sync({ force:false })
    .then(() => {
        console.log('Tablas sincronizadas!')
    })
module.exports = {
    Usuario
}