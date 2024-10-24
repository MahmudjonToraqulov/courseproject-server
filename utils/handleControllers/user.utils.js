const db = require('../../models/index')
const User = db.user

exports.findUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id)
        if(!user){
            res.status(404).json({ message: 'User Not Found...' })
            return null
        }
        return user
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}