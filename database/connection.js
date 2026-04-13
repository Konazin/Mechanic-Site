// database/connection.js
const { Sequelize } = require('sequelize');
const path = require('path');

console.log('🔹 database/connection.js carregado');
console.log('🔹 NODE_ENV:', process.env.NODE_ENV);

const isProduction = process.env.NODE_ENV === 'production';
let sequelize;

try {
  if (isProduction) {
    // PostgreSQL em produção
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL não definida em produção!');
    }
    
    console.log('🗄️ Conectando ao PostgreSQL (produção)');
    sequelize = new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      protocol: 'postgres',
      logging: false,
      dialectOptions: {
        ssl: { require: true, rejectUnauthorized: false }
      },
      pool: { max: 5, min: 0, acquire: 30000, idle: 10000 }
    });
  } else {
    // SQLite em desenvolvimento
    const dbPath = path.resolve(__dirname, 'database.sqlite');
    console.log(`📦 Usando SQLite em: ${dbPath}`);
    
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: dbPath,
      logging: false,
      define: { timestamps: true, underscored: true }
    });
  }
  
  console.log('✅ Instância do Sequelize criada');
  
} catch (error) {
  console.error('❌ Erro ao criar instância do Sequelize:', error.message);
  throw error;
}

module.exports = sequelize;