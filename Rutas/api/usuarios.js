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

router.put('/:id', async (req, res) =>{
    await Usuario.update(req.body, {
        where: {id: req.params.id}}) // actualizo el usuario que tenga esa id con los datos que trae la api
    res.json({success: 'Usuario actualizado'});
} );

module.exports = router;