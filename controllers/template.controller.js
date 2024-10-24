const db = require('../models')
const formOptions = require('../utils/options/form.options')
const formUtils = require('../utils/handleControllers/form.utils')
const renameKeys = require('../utils/createDto')
const Template = db.template
const TemplateField = db.templateFields


exports.getTemplates = async (req, res) => {
    try{
        const allTemplates = await Template.findAll(formOptions.getAllFormOptions())
        const renamedForm = allTemplates.map(form => renameKeys(form, ['form_user'], ['user']))
        res.status(200).json(renamedForm)
    }
    catch (error) {
        res.status(500).send({ message: error.message })
    }
}

exports.getFormByUserId = async (req, res) => {
    try {
        const userId = req.params.userId
        const form = await Template.findAll(formOptions.getFormByUserIdOptions(userId))
        const renamedForm = form.map(item => renameKeys(item, ['form_formField'], ['formFields']))
        res.status(200).json(renamedForm)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getFormById = async (req, res) => {
    try {
        const id = req.params.id
        const form = await formUtils.findForm(res, id)
        if (!form) return 
        let renamedForm = renameKeys(form, ['form_formField', 'form_user', 'form_topic'], ['formFields', 'user', 'topic'])
        res.status(200).json(renamedForm)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.createForm = async (req, res) => {
    try {
        const formData = JSON.parse(req.body.formData)
        const form = await formUtils.handleCreateForm(req, formData, res)
        if (!form) return
        res.status(200).json(form)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.updateForm = async (req, res) => {
    try {
        const id = req.params.id
        const formData = JSON.parse(req.body.formData)
        const updateForm = await formUtils.handleUpdateForm(req, formData, res, id )
        if (!updateForm) return
        res.status(200).json(updateForm)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.deleteForm = async (req, res) => {
    try {
        const id = req.params.id
        const form = await formUtils.findForm(res, id)
        if (!form) return
        await form.destroy()
        res.status(204).json()
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.deleteFormField = async (req, res) => {
    try {
        const id = req.params.id
        const formField = await TemplateField.findByPk(id)
        if (!formField) return
        await formField.destroy()
        res.status(204).json()
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}