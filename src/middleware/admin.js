const jwt = require('jsonwebtoken');

// This code is a middleware that checks if the user is an admin or not.
// It returns a 401 status code if the user is not an admin.
// It returns a 401 status code if the user is not logged in.
// It returns a 401 status code if the token is invalid.
// It returns a 401 status code if the user is logged in but not an admin.
// It returns the user's id if the user is logged in and is an admin.

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