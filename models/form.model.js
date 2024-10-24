
module.exports = (sequalize, Sequalize) => {
    const FilledForm = sequalize.define('filled_form', {
        formId: {
            type: Sequalize.INTEGER,
            references: {
                model: 'templates',
                key: 'id'
            },
            allowNull: false,
            onDelete: 'CASCADE'
        },
        userId: {
            type: Sequalize.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            },
            allowNull: false,
            onDelete: 'CASCADE'
        }
    })

    return FilledForm
}