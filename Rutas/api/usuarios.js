const router = require('express').Router();
const { Usuario } = require('../../db') // traigo la entidad usuarios

// localhost:3000/api/usuarios

router.get('/', async (req, res) =>{
    const usuarios = await Usuario.findAll(); // devuelve una promesa
    res.json(usuarios);
} );

router.post('/', async (req, res) =>{
    const usuarios = await Usuario.create(req.body) // creo al usuario con los datos que trae la api
    res.json(usuarios); // aca me la devuelve para ver q onda
} );

module.exports = router;