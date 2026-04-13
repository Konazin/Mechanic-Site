const path = require('path');
 
// dotenv só em desenvolvimento (em produção as vars vêm do Render)
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: path.resolve(__dirname, '.env') });
}
 
console.log('🚀 Mechanic-API iniciando | NODE_ENV:', process.env.NODE_ENV || 'development');
 
const express = require('express');
const cors = require('cors');
 
// 1. Conexão com o banco
let sequelize;
try {
  sequelize = require('../database/connection');
  console.log('✅ Sequelize carregado');
} catch (err) {
  console.error('❌ Erro ao carregar sequelize:', err.message);
  process.exit(1);
}
 
// 2. Registrar models ANTES das rotas
try {
  require('./models/User');
  require('./models/Scheduling');
  console.log('✅ Models registrados');
} catch (e) {
  console.error('❌ Erro ao registrar models:', e.message);
  process.exit(1);
}
 
const app = express();
const PORT = process.env.PORT || 10000;
 
// 3. Middlewares globais
const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(',').map(o => o.trim())
  : ['http://localhost:5173'];
 
app.use(cors({
  origin: (origin, callback) => {
    // Permite requisições sem origin (ex: curl, Postman) e origins na lista
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error(`CORS bloqueado para origin: ${origin}`));
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
// 4. Health check (sem autenticação)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
 
// 5. Todas as rotas via routes/index.js (fonte única de verdade)
app.use('/api', require('./routes'));
 
// 6. Handler 404 para rotas não existentes
app.use((req, res) => {
  res.status(404).json({ error: `Rota não encontrada: ${req.method} ${req.originalUrl}` });
});
 
// 7. Handler de erros globais
app.use((err, req, res, next) => {
  console.error('❌ Erro não tratado:', err.message);
  res.status(500).json({ error: 'Erro interno do servidor' });
});
 
// 8. Iniciar servidor
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Banco conectado');
 
    await sequelize.sync({ alter: true });
    console.log('🔄 Models sincronizados');
 
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Erro fatal ao iniciar:', error.message);
    setTimeout(() => process.exit(1), 1000);
  }
};
 
startServer();
process.on('unhandledRejection', err => console.error('❌ Unhandled Rejection:', err));