// back-end/controllers/schedulingController.js
const { Op } = require('sequelize');

// Model: ajuste o caminho conforme sua estrutura
let Scheduling;
try {
  Scheduling = require('../models/Scheduling');
} catch (e) {
  console.log('⚠️ Model Scheduling não encontrado, usando stub');
  Scheduling = {
    findAll: async () => [],
    findOne: async () => null,
    findByPk: async () => null,
    create: async (data) => ({ id: Date.now(), ...data }),
    update: async function(data) { return { ...this, ...data }; }
  };
}

// Stub para dev - substitua pela lógica real depois
exports.createAppointment = async (req, res) => {
  try {
    const { date, time, notes, vehicleInfo } = req.body;
    const userId = req.userId;
    
    if (!userId) return res.status(401).json({ error: 'Não autenticado' });
    if (!date || !time) return res.status(400).json({ error: 'Data e hora obrigatórias' });

    const appointment = await Scheduling.create({
      userId, date, time, notes, vehicleInfo, status: 'pending'
    });
    
    res.status(201).json({ message: 'Agendado', appointment });
  } catch (error) {
    console.error('Erro:', error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Scheduling.findAll({
      where: { userId: req.userId },
      order: [['date', 'ASC'], ['time', 'ASC']]
    });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAvailableSlots = async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ error: 'Data obrigatória' });
    
    const slots = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'];
    res.json({ date, available: slots, booked: [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Stub para as outras funções
exports.getAppointmentById = (req, res) => res.status(501).json({ error: 'Não implementado' });
exports.updateAppointment = (req, res) => res.status(501).json({ error: 'Não implementado' });
exports.cancelAppointment = (req, res) => res.status(501).json({ error: 'Não implementado' });