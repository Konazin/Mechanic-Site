// back-end/models/Scheduling.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../database/connection');
const User = require('./User'); // Importa o model User para relacionamento

const Scheduling = sequelize.define('Scheduling', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    //references: {
    //  model: 'users',
    //  key: 'id'
    //}
  },
  serviceId: {
    type: DataTypes.INTEGER,
    allowNull: true // Pode ser null se for agendamento genérico
  },
  date: {
    type: DataTypes.DATEONLY, // Apenas data (YYYY-MM-DD)
    allowNull: false
  },
  time: {
    type: DataTypes.STRING, // Formato: "HH:MM"
    allowNull: false
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
    type: DataTypes.STRING, // Ex: "Gol 2020 - ABC-1234"
    allowNull: true
  }
}, {
  tableName: 'scheduling',
  timestamps: true,
  underscored: true
});

// Relacionamento: Um usuário tem muitos agendamentos
User.hasMany(Scheduling, { foreignKey: 'userId', as: 'appointments' });
Scheduling.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = Scheduling;