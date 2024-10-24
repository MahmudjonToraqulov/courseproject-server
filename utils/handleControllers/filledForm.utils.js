const db = require('../../models/index')
const valuesForUpdate = [ 'question', 'answer' ]
const FilledForm = db.filled_forms
const FilledFormItem = db.form_items
const sequalize = db.sequalize

const createUpdateFilledFormItems = async (items, filledFormId, transaction, res) => {
    let myItems = []
    items.map((item) => {
        myItems.push({ ...item, filledFormId })
    })
    try {
        await FilledFormItem.bulkCreate(myItems, { updateOnDuplicate: valuesForUpdate, transaction })
        return true
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports.createFilledForm = async (req, res) => {
    try {
        const transaction = await sequalize.transaction()
        const filledForm = await FilledForm.create(req.body.data)
        await createUpdateFilledFormItems(req.body.data.items, filledForm.id, transaction, id)
        if(!createUpdateFilledFormItems) return false
        await transaction.commit()
        return filledForm.id
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}