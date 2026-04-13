// back-end/models/Scheduling.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../database/connection');
const User = require('./User');

const Scheduling = sequelize.define('Scheduling', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  serviceId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  date: {
    type: DataTypes.DATEONLY, // Apenas data (YYYY-MM-DD)
    allowNull: false
  },
  time: {
    type: DataTypes.STRING, // Formato: "HH:MM"
    allowNull: false,
    validate: {
      is: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/ // Valida formato HH:MM
    }
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'cancelled', 'completed'),
    defaultValue: 'pending'
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  vehicleInfo: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'scheduling',
  timestamps: true,
  underscored: false // ✅ CORRIGIDO: era true, agora é false para consistência
});

// Relacionamentos
User.hasMany(Scheduling, { 
  foreignKey: 'userId', 
  as: 'appointments',
  onDelete: 'CASCADE' // Se deletar usuário, deleta agendamentos
});

Scheduling.belongsTo(User, { 
  foreignKey: 'userId', 
  as: 'user' 
});

module.exports = Scheduling;
