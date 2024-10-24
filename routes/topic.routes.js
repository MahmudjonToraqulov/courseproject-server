const controller = require('../controllers/topic.controller')

module.exports = function(app){
    app.use(function(req, res, next) {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        )
        next()
    })

    app.get('/topics', controller.getTopics)

    // app.get('/topic/:topicId', controller.getTopic)
}