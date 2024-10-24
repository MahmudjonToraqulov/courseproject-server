const controller = require('../controllers/filledForm.controller')

module.exports = function(app){
    app.use(function(req, res, next) {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        )
        next()
    })

    app.get('/filled-forms', controller.getAllFilledForms)
    app.get('/filled-forms/user/:userId', controller.getFilledFormsByUserId)
    app.get('/filled-forms/:id', controller.getFilledFormById)
    
    app.post('/filled-forms', controller.createFilledForm)

    app.put('/filled-forms', controller.editFilledFormItems)

    app.delete('/filled-forms/:id', controller.deleteFilledForm)
}
