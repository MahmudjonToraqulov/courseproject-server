const controller = require('../controllers/comment.controller')

const auth = () => {}

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept',
        )
        next()
    })
 
    app.get('/comments/:templateId', controller.getAllComments)

    app.post('/comments',  controller.createComment)

    // app.patch('/comments/:commentId', auth, controller.updateComment)

    app.delete('/comments/:commentId', auth, controller.deleteComment)
}