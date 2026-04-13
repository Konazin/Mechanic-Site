// database/connection.js
const { Sequelize } = require('sequelize');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

let sequelize;

if (isProduction) {
  // PostgreSQL em produção (Render)
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

module.exports = sequelize;