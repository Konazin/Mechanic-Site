// back-end/models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../database/connection');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'users',
  timestamps: true,
  underscored: false // ✅ CONSISTENTE: usa createdAt, updatedAt
});

module.exports = User;
