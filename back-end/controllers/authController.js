// back-end/controllers/authController.js
const bcrypt = require('bcryptjs'); // ✅ CORRIGIDO: era 'bcrypt', agora é 'bcryptjs'
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// 🔐 Login de usuário
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar campos
    if (!email || !password) {
      return res.status(400).json({ error: 'E-mail e senha são obrigatórios' });
    }

    // Buscar usuário pelo e-mail
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return res.status(401).json({ error: 'E-mail ou senha inválidos' });
    }

    // Verificar senha
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'E-mail ou senha inválidos' });
    }

    // Gerar token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Retornar dados sem a senha
    const { password: _, ...userWithoutPassword } = user.toJSON();
    
    res.json({
      message: 'Login realizado com sucesso',
      token,
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro interno ao fazer login' });
  }
};

// 📤 Logout (apenas remove o token no front-end)
exports.logout = (req, res) => {
  res.json({ message: 'Logout realizado com sucesso' });
};

// 👤 Obter dados do usuário logado (via token)
exports.getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json(user);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ error: 'Erro interno ao buscar usuário' });
  }
};
