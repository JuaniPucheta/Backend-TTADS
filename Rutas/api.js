const router = require('express').Router();

const middleware = require('./middlewares');

const apiUsuariosRouter = require('./api/usuarios')
const apiRolesRouter = require('./api/roles')

router.use('/usuarios', apiUsuariosRouter) // esto detecta si la api es de usuarios(/api/usuarios), si asi lo es, lo manda al usuarios.js
router.use('/roles', middleware.checkToken, apiRolesRouter) // todas las rutas parqa roles primero pasan por el middleware, osea que revisan el token

// https://youtu.be/50dugGTFvi8?list=PLs4YDKCLLrp8-YZXybBkSqTS-hE-3Lah7&t=856

module.exports = router;
