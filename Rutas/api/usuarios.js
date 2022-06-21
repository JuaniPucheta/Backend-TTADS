const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { Usuario } = require('../../db') // traigo la entidad usuarios

router.get('/', async (req, res) =>{
    const usuarios = await Usuario.findAll(); // devuelve una promesa
    res.json(usuarios);
} );

router.post('/register', async (req, res) =>{
    req.body.pw = bcrypt.hashSync(req.body.pw, 10); // agarro la pw, y le paso 10 veces el algoritmo de encriptacion
    const usuarios = await Usuario.create(req.body) // creo al usuario con los datos que trae la api
    res.json(usuarios); // aca me la devuelve para ver q onda
} );

router.put('/:id', async (req, res) =>{
    await Usuario.update(req.body, {
        where: {id: req.params.id}}) // actualizo el usuario que tenga esa id con los datos que trae la api
    res.json({success: 'Usuario actualizado'});
} );

router.delete('/:id', async (req, res) =>{
    await Usuario.destroy({
        where: {id: req.params.id}
    }) // elimino el usuario que tenga esa id
    res.json({success: 'Usuario destruido'});
} );

module.exports = router;