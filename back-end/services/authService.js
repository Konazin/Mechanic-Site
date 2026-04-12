const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { User } = require('../../database/models')

const SECRET = process.env.JWT_SECRET

async function login(email, password) {
    const user = await User.findOne({ where: { email } })

    if (!user) return null

    const valid = await bcrypt.compare(password, user.password)

    if (!valid) return null

    const token = jwt.sign(
        { id: user.id },
        SECRET,
        { expiresIn: '1d' }
    )

    return token
}

module.exports = { login }