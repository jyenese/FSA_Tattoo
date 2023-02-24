const jwt = require('jsonwebtoken');

// This code is used to verify that the user is logged in or not
// Functions used are auth, req, res, next, token, payload, jwt

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
