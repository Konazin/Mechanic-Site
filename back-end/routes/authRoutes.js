const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User } = require('../../database/models')

const SECRET = "supersecretkey"

// 🔹 LOGIN
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ where: { email } })

        if (req.user.id !== req.params.id) {
            return res.status(403).json({ error: 'Forbidden' })
        }

        if (!user) {
            return res.status(400).json({ error: 'User not found' })
        }

        // 🔐 compara senha
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid password' })
        }

        // 🔑 gera token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            SECRET,
            { expiresIn: '1d' }
        )

        res.json({ token })

    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Login error' })
    }
})

module.exports = router