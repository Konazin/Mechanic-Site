// back-end/models/index.js (exemplo Sequelize)
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../database/connection'); // Ajuste o caminho

// Definir modelo User
const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: true }
}, {
  tableName: 'users',
  timestamps: true,
  underscored: false
});

// Exportar
module.exports = { User };