const { User } = require('../../database/models')

async function getAllUsers() {
    return await User.findAll({
        attributes: { exclude: ['password'] }
    })
}

async function createUser(data) {
    return await User.create(data)
}

module.exports = {
    getAllUsers,
    createUser
}