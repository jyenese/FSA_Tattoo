const jwt = require('jsonwebtoken');

function admin(req, res, next){
    if(!req.payload.is_admin) {
        return res.status(401).json({ data: "Unauthorized/ Not an artist"})
    }
    next()
}

module.exports = admin