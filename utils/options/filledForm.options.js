const db = require('../../models/index')
const User = db.users
const Template = db.templates
const FilledForm = db.filled_forms

const userOptions = {
    model: User,
    as: 'filledForm_user',
    attributes: ['id', 'name']
}

const formOptions = {
    model: Template,
    as: 'filledForm_form',
    attributes: ['title', 'id', 'userId']
}

const filledFormItems = {
    model: FilledForm,
    as: 'filledForm_filledFormItem'
}

exports.filledFormOptions = (formId) => {
    return {
        where: {
            formId
        },
        attributes: {
            exclude: ['userId', 'formId', 'updatedAt']
        },
        include: [ userOptions, formOptions ]
    }
}

exports.getFilledFormByIdOptions = (id) => {
    return {
        where: {
            id
        },
        include: [ userOptions, formOptions, filledFormItems ]
    }
}

exports.getAllFilledForms = () => {
    return {
        attributes: {
            exlude: ['userId', 'formId', 'updatedAt']
        },
        include: [ userOptions, formOptions ]
    }
}