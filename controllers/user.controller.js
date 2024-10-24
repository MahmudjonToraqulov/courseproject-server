const db = require('../models')
const userUtils = require("../utils/handleControllers/user.utils")
const User = db.user
const Template = db.template
const UserRoles = db.ROLES
const Role = db.role
const Topic = db.topic


exports.userManagement = async (req, res) => {
    try {
        const users = await User.findAll({
            include: [{
              model: Role,
              attributes: ["name"], // Exclude UserRole attributes
              through: { attributes: [] },
            }],
          }); // Fetch all users
        res.status(200).json(users); // Send the users as JSON
    } catch (error) {
        res.status(500).send({ message: error.message }); // Handle errors
    }
}

exports.giveAdminToUser = async (req, res) => {
    try {
        const user = await userUtils.findUserById(req, res)
        if (!user) {
            return
        }
        await user.update({ role: 'admin' })
        res.status(204).json()
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.removeAdminFromUser = async (req, res) => {
    try {
        const user = await userUtils.findUserById(req, res)
        if (!user){
            return
        }
        await user.update({ role: 'user' })
        res.status(204).json()
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.blockUser = async (req, res) => {
    try {
        const user = await userUtils.findUserById(req, res)
        if(!user){
            return
        }
        console.log('USERUSERUSERUSERUSERUSERUSERUSERUSERUSERUSERUSERUSERUSERUSERUSERUSERUSER -> ', user);
        
        await user.update({ isBlocked: true })
        res.status(204).json()
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.unblockUser = async (req, res) => {
    try {
        const user = await userUtils.findUserById(req, res)
        if (!user){
            return
        }
        await user.update({ isBlocked: false })
        res.status(204).json()
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const user = await userUtils.findUserById(req, res)
        if (!user){
            return
        }
        await user.destroy()
        res.status(204).json("Successfully deleted!")
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}