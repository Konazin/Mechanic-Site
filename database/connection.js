// database/connection.js
const { Sequelize } = require('sequelize');
const path = require('path');

// Detecta o ambiente
const isProduction = process.env.NODE_ENV === 'production';

let sequelize;

if (isProduction) {
  // Produção: PostgreSQL (Render)
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false }
    }
  });
} else {
  // Desenvolvimento: SQLite
  const dbPath = path.resolve(__dirname, 'database.sqlite');
  console.log(`📦 Usando SQLite em: ${dbPath}`);
  
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: dbPath,
    logging: false,
    define: { timestamps: true, underscored: true },
    
    // 🔹 DESATIVA FOREIGN KEYS NO SQLITE (para dev)
    dialectOptions: {
      foreignKeys: false
    },
    // 🔹 Ou, se não funcionar, use hooks para desativar:
    hooks: {
      beforeConnect: async (config) => {
        // SQLite precisa disso para desativar constraints
        if (config.dialect === 'sqlite') {
          const sqlite = require('sqlite3');
          // Isso será aplicado via query após conectar
        }
      }
    }
  });
  
  // 🔹 Após conectar, desativa foreign keys via query
  sequelize.afterConnect(() => {
    if (!isProduction) {
      return sequelize.query('PRAGMA foreign_keys = OFF;');
    }
  });
}

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Banco conectado!');
  } catch (error) {
    console.error('❌ Erro de conexão:', error.message);
  }
};
testConnection();

module.exports = sequelize;