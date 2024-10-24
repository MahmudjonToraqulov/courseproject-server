const db = require('../models')
const Comments = db.comments
const User = db.users

exports.getAllComments = async (req, res, next) => {
    try {
        const id = req.params.templateId
        const comments = await Comments.findAll({ 
            where: {
                id
            },
            include: User
         })
         res.status(200).json(comments)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.createComment = async (req, res, next) => {
    try {
        const { templateId, text } = req.body
        const author = req.user.id
        const comment = await Comments.create({
            templateId: templateId,
            comment: text,
            username: author,
        })

        const createdComment = await Comments.findByPk(comment.id, {
            include: User
        })

        res.status(200).json(createdComment)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// exports.updateComment = async (req, res, next) => {
    
// }

exports.deleteComment = async (req, res, next) => {
    try {
        const commentId = req.params.commentId
        await Comments.destroy({
            where: {
                id: commentId
            }
        })
        res.status(200).json('The comment deleted!')
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}