const jwt = require('jsonwebtoken')
const config = require('../config/auth.config.js')
const db = require('../models')
const User = db.user

verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token']

    if(!token){
        return res.status(403).send({
            message: 'No token provided!'
        })
    }

    jwt.verify(token,
        config.secret,
        (err, decoded) => {
            if(err){
                return res.status(400).send({
                    message: 'Unauthorized!'
                })
            }
            req.userId = decoded.id
            next()
        }
    )
}

isAdmin = (req, res, next) => {
    User.findByPk(res.userId).then(user => {
        user.getRoles().then(roles => {
            for( let i = 0; i < roles.length; i++){
                if (roles[i].name === 'admin'){
                    next()
                    return
                }
            }

            res.status(403).send({
                message: 'Admin role required!'
            })
            return
        })
    })
}

isCreator = (req, res, next) => {
    User.findByPk(res.userId).then(user => {
        user.getRoles().then(roles => {
            for( let i = 0; i < roles.length; i++){
                if (roles[i].name === 'creator'){
                    next()
                    return
                }
            }

            res.status(403).send({
                message: 'Creator role required!'
            })
        })
    })
}

isCreatorOrAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "creator") {
                  next();
                  return;
                }
        
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }
        
            res.status(403).send({
                message: "Creator or Admin role required!"
            });
        })
    })
}

const authJWT = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isCreator: isCreator,
    isCreatorOrAdmin: isCreatorOrAdmin  
}
module.exports = authJWT