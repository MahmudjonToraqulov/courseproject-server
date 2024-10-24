const config = require('../db.config.js')

const Sequalize = require('sequelize')
const sequalize = new Sequalize(
    config.DATABASE,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
)

const db = {}

db.Sequalize = Sequalize
db.sequalize = sequalize

db.user = require('../models/user.model.js')(sequalize, Sequalize)
db.role = require('../models/role.model.js')(sequalize, Sequalize)
db.template = require('../models/template.model.js')(sequalize, Sequalize)
db.topic = require('../models/topic.models.js')(sequalize, Sequalize)
db.comments = require('../models/comments.model.js')(sequalize, Sequalize)
db.like = require('../models/like.model.js')(sequalize, Sequalize)
db.tag = require('../models/tag.model.js')(sequalize, Sequalize)
db.form = require('../models/form.model.js')(sequalize, Sequalize)
db.formItems = require('../models/formItems.model.js')(sequalize, Sequalize)
db.templateFields = require('../models/templateFields.model.js')(sequalize, Sequalize)
db.allTags = require('../models/allTags.model.js')(sequalize, Sequalize)

db.role.belongsToMany(db.user, {
    through: 'user_roles'
})

db.user.belongsToMany(db.role, {
    through: 'user_roles'
})

// db.template.belongsToMany(db.user, {
//     through: 'user_template'
// })

// db.user.belongsToMany(db.template, {
//     through: 'user_template'
// })


db.user.hasMany(db.like, {
    // foreignKey: 'userId'
})
db.like.belongsTo(db.user)

db.user.hasMany(db.comments, {
    // foreignKey: 'userId'
})
db.comments.belongsTo(db.user)

db.user.hasMany(db.tag, {
    // foreignKey: 'userId'
})
db.tag.belongsTo(db.user)



db.template.hasMany(db.like, {
    // foreignKey: 'userId'
})
db.like.belongsTo(db.template)

db.template.hasMany(db.comments, {
    // foreignKey: 'userId'
})
db.comments.belongsTo(db.template)

db.template.hasMany(db.tag, {
    // foreignKey: 'userId'
})
db.tag.belongsTo(db.template)








db.form.hasMany(db.formItems, {
    foreignKey: 'filledFormId',
    as: 'filledForm_filledFormItem'
})

db.formItems.belongsTo(db.form, {
    foreignKey: 'filledFormId',
    as: 'filledFormItem_filledForm'
})


db.user.hasMany(db.form, {
    foreignKey: 'userId',
    as: 'user_filledForm'
})

db.form.belongsTo(db.user, {
    foreignKey: 'userId',
    as: 'filledForm_user'
})


db.template.hasMany(db.form, {
    foreignKey: 'formId',
    id: 'form_filledForm'
})

db.form.belongsTo(db.template, {
    foreignKey: 'formId',
    as: 'filledForm_form'
})

db.topic.hasMany(db.template, {
    foreignKey: 'topicId',
    as: 'topic_form'
})

db.template.belongsTo(db.topic, {
    foreignKey: 'topicId',
    as: 'form_topic'
})

db.user.hasMany(db.template, {
    foreignKey: 'userId',
    as: 'user_form'
})

db.template.belongsTo(db.user, {
    foreignKey: 'userId',
    as: 'form_user'
})

db.template.hasMany(db.templateFields, {
    foreignKey: 'formId',
    as: 'form_formField'
})

db.templateFields.belongsTo(db.template, {
    foreignKey: 'formId',
    as: 'formField_form'
})

db.ROLES = [ 'user', 'admin' ]

module.exports = db