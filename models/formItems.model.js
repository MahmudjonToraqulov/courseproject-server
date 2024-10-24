module.exports = (sequalize, Sequalize) => {
    const FilledFormItem = sequalize.define('form_items', {
        filledFormId: {
            type: Sequalize.INTEGER,
            references: {
                model: 'filled_forms',
                key: 'id'
            },
            allowNull: false,
            onDelete: 'CASCADE'
        },
        question: {
            type: Sequalize.STRING,
            allowNull: false
        },
        answer: {
            type: Sequalize.STRING
        }
    })
    
    return FilledFormItem
}