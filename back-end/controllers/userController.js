const userService = require('../services/userService')
const bcrypt = require('bcrypt')

async function getAllUsers(req, res) {
    const users = await userService.getAllUsers()
    res.json({ users })
}

async function createUser(req, res) {
    const { name, email, password } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await userService.createUser({
        name,
        email,
        password: hashedPassword
    })

    res.status(201).json({ user })
}

module.exports = { getAllUsers, createUser }