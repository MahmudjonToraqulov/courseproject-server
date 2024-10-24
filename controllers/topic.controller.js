const db = require('../models')
const Topics = db.topic


exports.getTopics = async (req, res) => {
    try {
        const allTopics = await Topics.findAll({attributes: ['id', 'name']})
        res.status(200).json(allTopics)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}