const router = require('express').Router();

const apiUsuariosRouter = require('./api/usuarios')
router.use('/usuarios', apiUsuariosRouter) // esto detecta si la api es de usuarios(/api/usuarios), si asi lo es, lo manda al usuarios.js
module.exports = router;