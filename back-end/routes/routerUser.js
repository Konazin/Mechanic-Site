// back-end/routes/routerUser.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Importar controller COMO OBJETO (evita undefined)
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// 📝 Rota PÚBLICA: Criar usuário (registro)
router.post('/',
  body('email').isEmail().withMessage('E-mail inválido'),
  body('password').isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres'),
  body('name').notEmpty().withMessage('Nome é obrigatório'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Chamar controller diretamente
    await userController.createUser(req, res);
  }
);

// 🔐 Rotas PROTEGIDAS: Usam authMiddleware
router.get('/', authMiddleware, userController.getAllUsers);
router.get('/:id', authMiddleware, userController.getUserById);
router.put('/:id', authMiddleware, userController.updateUser);
router.delete('/:id', authMiddleware, userController.deleteUser);

module.exports = router;