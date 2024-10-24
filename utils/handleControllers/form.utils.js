const db = require('../../models/index')
const FormOptions = require('../options/form.options')
const renameKeys = require('../createDto')
const { getFilledFormByIdOptions } = require('../options/filledForm.options')

const valuesForUpdate = [ 'name', 'position', 'type', 'options', 'hidden' ]
const sequalizeValidationError = 'SequalizeValidationError'

const FormField = db.templateFields
const Form = db.templates 
const sequalize = db.sequalize

const handleSequalizeValidationErrors = (err, res) => {
    const messages = err.errors.map(err => err.message)
    res.status(400).json({ message: messages[0] })
}

const deleteArrayOfFormFields = async (formData, transaction) => {
    await FormField.destroy({
        where: {
            id: formData.deletedFields
        },
        transaction
    })
}

const createUpdateFormFields = async (formData, formId, transaction, res) => {
    let formFields = []
    formData.formFields.map(async (item, index) => {
        formFields.push({ ...item, position: index + 1, formId })
    })
    try {
        await FormField.bulkCreate(formFields, {updateOnDuplicate: valuesForUpdate, transaction})
        return true
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.findForm = async (res, id) => {
    try {
        const form = await Form.findOne(getFilledFormByIdOptions(id))
        if(!form){
            res.status(404).json({ message: 'Form not found!' })
            return false
        }
        return form
    } catch (error) {
        res.status(500).json({ message: error.message })
        return false
    }
}

exports.handleCreateForm = async (req, formData, res) => {
    try {
        if (req.body.imageUrl) formData.imageUrl = req.body.imageUrl
        const transaction = await sequalize.transaction()
        const form = await Form.create(formData, {transaction})
        const createFormFields = await createUpdateFormFields(formData, form.id, transaction, res)
        if (!createFormFields) return false
        await transaction.commit()
        return form 
    } catch (error) {
        if (error.name === sequalizeValidationError ){
            handleSequalizeValidationErrors(error, res)
            return false
        }
        res.status(500).json({ message: error.message })
        return false
    }
}

exports.handleUpdateForm = async (req, formData, res, id) => {
    try {
        if(req.body.imageUrl) formData.imageUrl = req.body.imageUrl
        const transaction = await sequalize.transaction()
        if(formData.deletedFields) await deleteArrayOfFormFields(formData, transaction)
        const form = await Form.findByPk(id)
        if(!form) return false
        const updatedForm = await form.update(formData, {transaction})
        const createFormFields = await createUpdateFormFields(formData, formData.id, transaction, res) 
        if(!createFormFields) return false
        await transaction.commit()
        return updatedForm
    } catch (error) {
        res.status(500).json({ message: error.message })
        return false
    }
}