const db = require('../models')
const User = db.users

module.exports = (sequalize, Sequalize) => {
    const Comments = sequalize.define('comments', {
        comment: {
            type: Sequalize.STRING,
            allowNull: false
        },
        username: {
            type: Sequalize.STRING,
            ref: {
                model: User,
            }
        },
        templateId: {
            type: Sequalize.INTEGER,
            allowNull: false
        }
    })
    return Comments
}