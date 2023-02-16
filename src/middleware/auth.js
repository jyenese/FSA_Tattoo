const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    let token = req.get('Authorization');
    token = token.split(" ")[1];
    if(!token) {
        return res.status(401).json({
            message: "Unauthenticated"
        })
    }
    try {
        const decoded = jwt.verify(token, "secret");
        req.user = decoded;
        next();
    }
    catch(err) {
        return res.status(401).json({
            message: "Unauthenticated"
        })
    }
}

// function authAdmin() {
//     return (req, res, next) => {
//         const { authorization } = req.headers;
//         if (authorization) {
//         const token = authorization.split(' ')[1];
//         jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//             if (err) {
//             return res.status(401).json({ message: 'Invalid token' });
//             }
//             if (decoded.role === 'admin') {
//             req.decoded = decoded;
//             next();
//             } else {
//             return res.status(401).json({ message: 'You are not authorized to access this resource' });
//             }
//         });
//         } else {
//         return res.status(401).json({ message: 'No token provided' });
//         }
//     };
// }

module.exports = {
    auth,
}