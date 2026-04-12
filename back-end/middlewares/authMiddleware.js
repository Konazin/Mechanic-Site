const jwt = require('jsonwebtoken')

const SECRET = "supersecretkey" // depois joga isso no .env

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ error: 'Token not provided' })
    }

    // formato: Bearer TOKEN
    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, SECRET)

        req.user = decoded // salva info do usuário na request

        next()
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' })
    }
}

module.exports = authMiddleware