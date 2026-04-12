const { body, validationResult } = require('express-validator')
const { User } = require('../../database/models')

// 🔹 regras de validação
const userValidationRules = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required'),

    body('email')
        .normalizeEmail()
        .isEmail().withMessage('Invalid email format'),

    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
]

// 🔹 middleware principal
const validateUser = async (req, res, next) => {
    try {
        // 1. valida input
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        // 2. checa se email já existe
        const existingUser = await User.findOne({
            where: { email: req.body.email }
        })

        if (existingUser) {
            return res.status(400).json({
                errors: [{ msg: 'Email already exists' }]
            })
        }

        // 3. segue o fluxo
        next()

    } catch (err) {
        console.error('Validation middleware error:', err)
        return res.status(500).json({
            error: 'Internal server error'
        })
    }
}

module.exports = {
    userValidationRules,
    validateUser
}