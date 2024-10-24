const db = require('../models')
const config = require('../config/auth.config')
const User = db.user
const Role = db.role

const Op = db.Sequalize.Op

let jwt = require('jsonwebtoken')
let bcrypt = require('bcryptjs')

exports.signup = async (req, res) => {

    // console.log('user -> ', req.body);
    
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: await bcrypt.hashSync(req.body.password, 8)
    })
    .then(user => {
        if(req.body.roles){
            Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles
                    }
                }
            }).then(roles => {
                user.setRoles(roles).then(() => {
                    res.send({
                        message: 'User registered successfully 1!'
                    })
                })
            })
        }
        else{
            user.setRoles([1]).then(() => {
                res.send({
                    message: 'User registered successfully 2!'
                })
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
}

exports.signin = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(user => {
        if(!user){
            return res.status(404).send({
                message: 'User not found!'
            })
        }

        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        )

        if (!passwordIsValid){
            return res.status(401).send({
                accessToken: null,
                message: 'Invalid password!'
            })
        }

        const token = jwt.sign({
                id: user.id
            },
            config.secret,
            {
                algorithm: 'HS256',
                allowInsecureKeySizes: true,
                expiresIn: 86400,
            }
        )

        let authorities = []
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++){
                authorities.push('ROLE_' + roles[i].name.toUpperCase())
            }
            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token
            })
        })
    })
    .catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
} 

exports.checkMe = async (req, res, next) => {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      return res.json({ message: 'deleted' });
    }
    if (user.isBlocked === 'blocked') {
      return res.json({ message: 'blocked' });
    }
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.status(200).json({ token });
}