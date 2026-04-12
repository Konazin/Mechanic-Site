// back-end/models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../database/connection');

const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: true }
}, {
  tableName: 'users',        // ✅ Força nome da tabela em minúsculo/plural
  timestamps: true,
  underscored: true          // ✅ Usa created_at, updated_at (padrão SQL)
});

module.exports = User;