module.exports = (sequelize, type) => {
    return sequelize.define('usuarios',{
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre: {
            type: type.STRING,
            allowNull: false
        },
        apellido: {
            type: type.STRING,
            allowNull: false
        },
        user: {
            type: type.STRING,
            allowNull: false
        },
        pw: {
            type: type.STRING,
            allowNull: false
        },
        telefono: {
            type: type.STRING,
            allowNull: false
        },
        email: {
            type: type.STRING,
            allowNull: false
        },
        idRol: {
            type: type.INTEGER,
            allowNull: false
        },
    })
}