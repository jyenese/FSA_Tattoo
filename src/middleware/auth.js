const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    let token = req.get('Authorization');
    token = token?.split(' ')?.[1];
    if(!token) {
        return res.status(401).json({
            data: "Unauthorized"
        })
    } try {
        const payload = jwt.verify(token, "secret")
        req.payload = payload
        next()
    } catch(err) {
        console.log(err)
        return res.status(401).json({ data: "Unauthorized"})
    }
}

module.exports = auth
