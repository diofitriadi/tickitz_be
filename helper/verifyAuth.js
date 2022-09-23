const jwt = require('jsonwebtoken')


const verifyAdmin = (req, res, next) => {
    if(!req.headers.authorization) {
        return res.status(401).send({message: 'unathorized admin, token needed'})
    } else {
        jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY, function(err, decoded) {
            if(err) {
                return res.status(403).send({message: 'forbidden'})
            }
            if(decoded.role === process.env.ROLE_ADMIN) {
                next()
            }else if(decoded.role === process.env.ROLE_USER) {
                return res.status(403).send({message: "Access Forbidden"})
            }
    });
    }
}

const verifyUser = (req, res, next) => {
    if(!req.headers.authorization) {
        return res.status(401).send({message: 'unauthorized user, token needed'})
    } else {
        jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY, function(err, decoded) {
            if(err) {
                return res.status(403).send({message: 'Access Forbidden'})
            }
            if(decoded.role === process.env.ROLE_USER) {
                next()
            } 
    });
    
    }
}

module.exports = {verifyAdmin, verifyUser}