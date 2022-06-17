const router = require('express').Router();
const { Usuario } = require('../../db') // traigo la entidad usuarios

router.get('/', async (req, res) =>{
    const usuarios = await Usuario.findAll(); // devuelve una promesa
    res.json(usuarios);
} );

router.get('/', async (req, res) =>{
    const usuarios = await Usuario.create(req.body)
    res.json(usuarios);
} );

module.exports = router;