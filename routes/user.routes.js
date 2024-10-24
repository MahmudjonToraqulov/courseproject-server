const { authJwt } = require('../middleware')
const controller = require('../controllers/user.controller')

module.exports = function(app){
    app.use(function(req, res, next) {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept',
        )
        next()
    })

    app.get('/api/test/all-users', controller.userManagement)

    app.put('/users/block-user/:id', controller.blockUser)

    app.put('/users/unblock-user/:id', controller.unblockUser)

    app.put('/users/give-admin/:id', controller.giveAdminToUser)
    
    app.put('/users/remove-admin/:id', controller.removeAdminFromUser)

    app.delete('/users/delete-user/:id', controller.deleteUser)
}