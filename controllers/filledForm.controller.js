const filledFormUtils = require('../utils/handleControllers/filledForm.utils')
const filledFormOptions = require('../utils/options/filledForm.options')
const renameKeys = require('../utils/createDto')
const db = require('../models')
const Form = db.templates
const FilledForm = db.filled_forms
const FilledFormItem = db.form_items

exports.getAllFilledForms = async (req, res) => {
    try {
       const filledForms = await FilledForm.findAll(filledFormOptions.getAllFilledForms())
       let renameFilledForms = filledForms.map(item => renameKeys(item, ['filledForm_user', 'filledForm_form'], ['user','form']))
       res.status(200).json(renameFilledForms)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.getFilledFormById = async (req, res) => {
    try {
        const id = req.params.id
        const filledForm = await FilledForm.findOne(filledFormOptions.getFilledFormByIdOptions())
        let renameFilledForm = renameKeys(filledForm, ['filledForm_form', 'filledForm_filledFormItem', 'filledForm_user'], ['form', 'items', 'user'])
        if (!renameFilledForm) return res.status(404).json({ message: 'Filled Form Not Found...' })
        res.status(200).json(renameFilledForm)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.createFilledForm = async (req, res) => {
    try {
        const filledForm = await createFilledForm(req, res)
        if (!filledForm) return
        res.status(201).json()
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.getFilledFormsByUserId = async (req, res) => {
    try {
        const userId = req.params.userId
        const forms = await Form.findAll({where: {userId}})
        let formId = forms.map(item => item.id)
        let filledForms = await FilledForm.findAll(filledFormOptions.filledFormOptions(formId))
        let renameFilledForms = filledForms.map(item => renameKeys(item, ['filledForm_user', 'filledForm_form'], ['user', 'form']))
        res.status(200).json(renameFilledForms)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.deleteFilledForm = async (req, res) => {
    try {
        const id = req.params.id
        const filledForm = await FilledForm.findByPk(id)
        if (!filledForm) return res.status(404).json({ error: 'Filled Form Not Found.' })
        await filledForm.destroy()
        res.status(204).json({message: 'Successfully Deleted!'})
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.editFilledFormItems = async (req, res) => {
    try {
        await Promise.all(
            req.body.data.map(async item => {
                await FilledFormItem.update(
                    {answer: item.answer, question: item.question},
                    {where: { id: item.id }},
                )
            })
        )
        res.status(200).json()
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}