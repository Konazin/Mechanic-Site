
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

console.log('🚀 Mechanic-API iniciando | NODE_ENV:', process.env.NODE_ENV || 'development');

const express = require('express');
const cors = require('cors');

// Importar sequelize
let sequelize;
try {
  sequelize = require('../database/connection');
  console.log('✅ Sequelize carregado');
} catch (err) {
  console.error('❌ Erro ao carregar sequelize:', err.message);
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 10000;

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Rotas
const routes = [
  { path: '/api/auth', file: './routes/authRoutes' },
  { path: '/api/users', file: './routes/routerUser' },
  { path: '/api/scheduling', file: './routes/schedulingRoutes' }
];

routes.forEach(({ path: routePath, file }) => {
  try {
    app.use(routePath, require(file));
    console.log(`✅ Rota: ${routePath}`);
  } catch (e) {
    console.warn(`⚠️ ${routePath}:`, e.message);
  }
});

// Registrar models para o Sequelize
console.log('🔹 Registrando models...');
try {
  require('./models/User');
  require('./models/Scheduling');
  console.log('✅ Models registrados');
} catch (e) {
  console.warn('⚠️ Models:', e.message);
}

// Iniciar servidor
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Banco conectado');
    
    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync({ alter: true });
      console.log('🔄 Models sincronizados');
    }
    
    app.listen(PORT, () => {
      console.log(`🚀 Servidor na porta ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Erro fatal:', error.message);
    setTimeout(() => process.exit(1), 1000);
  }
};

startServer();
process.on('unhandledRejection', err => console.error('❌ Unhandled:', err));