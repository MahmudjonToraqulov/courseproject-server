const db = require('../models')

module.exports = (sequalize, Sequalize) => {
    const TemplateFields = sequalize.define('template_fields', {
        templateId: {
            type: Sequalize.INTEGER,
            references: {
                model: 'templates',
                key: 'id'
            },
            allowNull: false,
            onDelete: 'CASCADE'
        },
        name: {
            type: Sequalize.STRING,
            allowNull: false
        },
        position: {
            type: Sequalize.STRING,
            allowNull: false
        },
        fieldType: {
            type: Sequalize.ENUM('text', 'textarea', 'boolean', 'select'),
            allowNull: false
        },
        fieldOptions: {
            type: Sequalize.ARRAY(Sequalize.STRING),
            defaultValue: null
        },
        isHidden: {
            type: Sequalize.BOOLEAN,
            defaultValue: false
        }
    })

    return TemplateFields
}