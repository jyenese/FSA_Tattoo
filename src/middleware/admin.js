const jwt = require('jsonwebtoken');

function admin(req, res, next) {
    let token = req.get('Authorization');
    token = token?.split(' ')?.[1];
    if(!token) {
        return res.status(401).json({
            data: "Unauthorized"
        })
    } try {
        const payload = jwt.verify(token, "secret")
        if(!payload.is_admin) {
            throw new Error()
        }
        req.userId = payload.id
        next()
    } catch(err) {
        console.log(err)
        return res.status(401).json({ data: "Unauthorized/ Not an admin"})
    }
}

module.exports = admin