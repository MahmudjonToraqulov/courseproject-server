const db = require('../../models/index')
const User = db.users
const FormField = db.templateFields
const Topic = db.topics

const userOptions = {
    model: User,
    as: 'form_user',
    attributes: ['id', 'name']
}

const formFieldOptions = {
    model: FormField,
    as: 'form_formField',
    order: [[ 'position', 'ASC' ]],
    attributes: {
        exclude: ['formId']
    }
}

const topicsOptions = {
    model: Topic,
    as: 'form_topic',
    attributes: ['id', 'label']
}

exports.getFormByUserIdOptions = (userId) => {
    return {
        where: {userId},
        order: [[ 'createdAt', 'desc' ]],
        include: [
            formFieldOptions
        ]
    }
}

exports.getAllFormOptions = () => {
    return {
        include: [userOptions],
        attributes: {
            exclude: ['userId']
        }
    }
}

exports.getFormByIdOptions = (id) => {
    return {
        where: {
            id
        },
        include: [
            formFieldOptions,
            userOptions,
            topicsOptions
        ],
        attributes: {
            exclude: ['userId']
        }
    }
}