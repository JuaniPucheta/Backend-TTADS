const jwt = require('jwt-simple');
const moment = require('moment');
const checkToken = (req, res, next) => {
    if(!req.headers['user-token']) {
        return res.json({error: 'Tenes que incluir el user-token en los headers'});
    }
    const userToken = req.headers['user-token'];
    let payload = {}
    try{
        payload = jwt.decode(userToken, 'secret');
    }catch (err) {
        return res.json({error: 'Token invalido'});
    }

    if(payload.expiredAt < moment().unix()) {
        return res.json({error: 'Token expirado'});
    }

    req.user = payload.usuarioId; // el req seria una especia de variable de session
    next();
}

module.exports = {
    checkToken: checkToken
}