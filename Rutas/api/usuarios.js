const router = require('express').Router();
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator'); // traigo esos 2 metodos de la libreria express-validator
// el check es un middleware que se ejecuta antes de que se ejecute el metodo que se le pasa
const { Usuario } = require('../../db') // traigo la entidad usuarios

router.get('/', async (req, res) =>{
    const usuarios = await Usuario.findAll(); // devuelve una promesa
    res.json(usuarios);
} );

router.post('/register',[
    check('user', 'El usuario no es valido').isLength({min:3}).not().isEmpty(), // valido que el tamano sea como minimo 3 y q no sea vacioo
    check('pw', 'La contraseña no es valida').isLength({min:3}).not().isEmpty(),
    check('email', 'El email no es valido').isEmail().not().isEmpty()
] ,  async (req, res) =>{

    // capturo los errores de la validacion
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()}); // en el caso que tire error, lo devuelvo en un json con el codigo 422 y el texto del error
    }

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