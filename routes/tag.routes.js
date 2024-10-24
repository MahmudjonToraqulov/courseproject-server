const controller = require('../controllers/tag.controller')

const checkParams = () => {}

module.exports = function(app){
    app.use(function(req, res, next) {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        )
        next()
    })

    app.get('/tags', controller.getTags)

    app.get('/tags/:tagId',  controller.getTagById)
}