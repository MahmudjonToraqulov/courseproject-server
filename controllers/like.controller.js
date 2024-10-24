const db = require('../models')
const Like = db.likes


exports.getLikes = async (req, res) => {
    try{
        const likeId = req.params.id
        const likes = await Like.findAndCountAll({ where: { templateId: likeId } })
        res.status(200).json(likes.count)
    }
    catch(error){
        res.status(400).json({ message: error.message })
    }
}

exports.getLike = async (req, res) => {
    try {
        const userId = req.query
        const templateId = req.query
        const like = await Like.findOne({
            where: {
                userId,
                templateId
            }
        })
        res.status(200).json(like)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.createOrDeleteLike = async (req, res) => {
    try {
        const userId = req.body
        const templateId = req.body
        const like = await Like.findOne({ where: {userId, templateId} })

        if(!like){
            await Like.create({ userId, templateId})
        }
        else{
            await Like.destroy({ where: { userId, templateId } })
        }
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}