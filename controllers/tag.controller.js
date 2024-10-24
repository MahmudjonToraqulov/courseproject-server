const db = require('../models')
const Tag = db.tag

exports.getTags = async (req, res, next) => {
    try {
        const allTags = Tag.findAll()
        res.status(200).json(allTags)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getTagById = async (req, res, next) => {
    try {
        const id = req.params.tagId
        const tag = Tag.findByPk(id)
        res.status(200).json(tag)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.createTag = async (req, res) => {
    try {
        // const id = 
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}