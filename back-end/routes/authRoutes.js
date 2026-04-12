// back-end/routes/authRoutes.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// 🔐 Login (público)
router.post('/login',
  body('email').isEmail().withMessage('E-mail inválido'),
  body('password').notEmpty().withMessage('Senha é obrigatória'),
  async (req, res) => {
    // Validar inputs antes de chamar o controller
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Chamar controller com await para garantir que é assíncrono
    await authController.login(req, res);
  }
);

// 📤 Logout (protegido)
router.post('/logout', authMiddleware, authController.logout);

// 👤 Perfil do usuário logado (protegido)
router.get('/me', authMiddleware, authController.getMe);

module.exports = router;