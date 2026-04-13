// database/connection.js
const { Sequelize } = require('sequelize');
const path = require('path');

// Detecta o ambiente
const isProduction = process.env.NODE_ENV === 'production';

let sequelize;

if (isProduction) {
  // Produção: PostgreSQL (Render, Railway, etc.)
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
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
    define: {
      timestamps: true,
      underscored: false // usa createdAt, updatedAt
    }
  });

  // ✅ CORRIGIDO: Desativar foreign keys no SQLite via query direta
  sequelize.afterConnect(() => {
    if (!isProduction) {
      return sequelize.query('PRAGMA foreign_keys = OFF;');
    }
  });
}

// Testar conexão
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Banco de dados conectado com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao conectar no banco:', error.message);
  }
};

testConnection();

module.exports = sequelize;
