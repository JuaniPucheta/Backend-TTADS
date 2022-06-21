const router = require('express').Router();
const { Rol, Usuario} = require('../../db')
const bcrypt = require("bcryptjs");


router.get('/', async (req, res) =>{
    const roles = await Rol.findAll(); // devuelve una promesa
    res.json(roles);
} );

router.post('/', async (req, res) =>{
    const rol = await Rol.create(req.body); // devuelve una promesa
    res.json(rol);
});

module.exports = router;