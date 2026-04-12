// back-end/index.js
const path = require('path');

// 1️⃣ Carregar variáveis de ambiente PRIMEIRO
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const express = require('express');
const cors = require('cors');

// 2️⃣ Importar a INSTÂNCIA do sequelize configurada (não a biblioteca!)
const sequelize = require('../database/connection');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API rodando!', timestamp: new Date() });
});

// Rotas
try {
  app.use('/api/auth', require('./routes/authRoutes'));
  app.use('/api/users', require('./routes/routerUser'));
  // ✅ GARANTA QUE ESTA LINHA ESTÁ ATIVA:
  app.use('/api/scheduling', require('./routes/SchedulingRoutes'));
} catch (e) {
  console.log('⚠️ Erro ao carregar rotas:', e.message);
}

// Middleware de erro global
app.use((err, req, res, next) => {
  console.error('❌ Erro:', err.stack);
  res.status(500).json({ 
    error: process.env.NODE_ENV === 'production' 
      ? 'Erro interno' 
      : err.message 
  });
});

// Iniciar servidor
const startServer = async () => {
  try {
    console.log('🔍 Conectando ao banco...');
    await sequelize.authenticate();
    console.log('✅ Banco de dados conectado!');
    
    if (process.env.NODE_ENV !== 'production') {
      console.log('🔄 Sincronizando models...');
      await sequelize.sync({ 
        alter: true,
        logging: console.log // ← Mostra as queries SQL executadas
      });
      console.log('🔄 Models sincronizados');
    }
    
    app.listen(PORT, () => {
      console.log(`🚀 Servidor em http://localhost:${PORT}`);
    });
  } catch (error) {
    // 🔹 LOG COMPLETO DO ERRO
    console.error('❌ ERRO DETALHADO:', {
      name: error.name,
      message: error.message,
      errors: error.errors, // ← Array de erros de validação do Sequelize
      stack: error.stack,
      original: error.original?.message
    });
    process.exit(1);
  }
};
startServer();