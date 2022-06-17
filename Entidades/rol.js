module.exports = (sequelize, type) => {
    return sequelize.define('rol',{
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        descripcion: {
            type: type.STRING,
            allowNull: false
        }
    })
}