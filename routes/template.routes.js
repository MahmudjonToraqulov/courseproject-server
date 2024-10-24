const controller = require('../controllers/template.controller')

const auth = () => {}

module.exports = function(app){
    app.use(function(req, res, next) {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept',
        )
        next()
    })
    
    app.get('/templates', controller.getTemplates)
    app.get('/templates/user/:userId', controller.getFormByUserId)
    app.get('/templates/:id', controller.getFormById)

    app.post('/templates', controller.createForm)

    app.put('/templates/:templateId', auth, controller.updateForm)

    app.delete('/templates/templateField/:', auth, controller.deleteFormField)
    app.delete('/templates/:id', auth, controller.deleteForm)

}