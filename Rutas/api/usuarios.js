const router = require('express').Router();
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator'); // traigo esos 2 metodos de la libreria express-validator
const moment = require('moment');
const jwt = require('jwt-simple');
const { Usuario } = require('../../db') // traigo la entidad usuarios

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

router.post('/login', async (req, res) =>{
    const user = await Usuario.findOne({where: {user: req.body.user}}); // busco al usuario por el user que le paso
    if(user) { // si encuentra al usuario por ese usuario hay que validar la PW
        const iguales = bcrypt.compareSync(req.body.pw, user.pw); // comparo la pw que le paso con la que tiene en la base de datos
        if(iguales) { // si son iguales, devuelvo el usuario
            res.json({success: createToken(user)}); // le paso el usuario y me devuelve el token
        } else {
            res.json({error: 'Error en usuario y/o contraseña'});
        }
    }
    else {
        res.json({error: 'Error en usuario y/o contraseña'}); // si no encuentra al usuario, lo devuelvo con un error
    }
});

// Genero el token
const createToken = (user) => {
    const payload = {
        usuarioId: user.id,
        createdAt: moment().unix(), // me devuelve la fecha actual en formato unix
        exiredAt: moment().add(5, 'minutes').unix() // le sumo 5 minutos a la fecha actual
    }
    return jwt.encode(payload, 'secret'); // le paso el payload y la clave secreta
} // me devuelve el token con una duracion de 5 minutos

router.get('/', async (req, res) =>{
    const usuarios = await Usuario.findAll(); // devuelve una promesa
    res.json(usuarios);
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