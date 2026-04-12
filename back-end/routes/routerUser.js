const express = require('express')
const router = express.Router()

const { getAllUsers } = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/', authMiddleware, getAllUsers)

module.exports = router