const controller = require('../controllers/like.controller')


const auth = () => {}

module.exports = function(app){
    app.use(function(req, res, next) {
        res.header(
            'Acess-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        )
        next()
    })

    app.get('/', controller.getLikes)

    app.post('/', auth, controller.createLike)

    app.delete('/:likeId', auth, controller.deleteLike )
}