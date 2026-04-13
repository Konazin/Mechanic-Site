// back-end/controllers/schedulingController.js
const { Op } = require('sequelize');
const Scheduling = require('../models/Scheduling');
const User = require('../models/User');

// ✅ Criar agendamento
exports.createAppointment = async (req, res) => {
  try {
    const { date, time, notes, vehicleInfo, serviceId } = req.body;
    const userId = req.userId; // Vem do authMiddleware
    
    // Validações
    if (!userId) {
      return res.status(401).json({ error: 'Não autenticado' });
    }
    
    if (!date || !time) {
      return res.status(400).json({ error: 'Data e hora são obrigatórias' });
    }

    // Verificar se horário já está ocupado
    const existingAppointment = await Scheduling.findOne({
      where: { date, time, status: { [Op.ne]: 'cancelled' } }
    });

    if (existingAppointment) {
      return res.status(400).json({ error: 'Horário já está ocupado' });
    }

    // Criar agendamento
    const appointment = await Scheduling.create({
      userId,
      serviceId: serviceId || null,
      date,
      time,
      notes: notes || null,
      vehicleInfo: vehicleInfo || null,
      status: 'pending'
    });
    
    res.status(201).json({
      message: 'Agendamento criado com sucesso',
      appointment
    });
  } catch (error) {
    console.error('Erro ao criar agendamento:', error);
    res.status(500).json({ error: 'Erro interno ao criar agendamento' });
  }
};

// ✅ Listar agendamentos do usuário
exports.getAppointments = async (req, res) => {
  try {
    const userId = req.userId;
    
    const appointments = await Scheduling.findAll({
      where: { userId },
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email', 'phone']
      }],
      order: [['date', 'ASC'], ['time', 'ASC']]
    });
    
    res.json(appointments);
  } catch (error) {
    console.error('Erro ao listar agendamentos:', error);
    res.status(500).json({ error: 'Erro interno ao listar agendamentos' });
  }
};

// ✅ Buscar agendamento por ID
exports.getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    
    const appointment = await Scheduling.findOne({
      where: { id, userId },
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email', 'phone']
      }]
    });
    
    if (!appointment) {
      return res.status(404).json({ error: 'Agendamento não encontrado' });
    }
    
    res.json(appointment);
  } catch (error) {
    console.error('Erro ao buscar agendamento:', error);
    res.status(500).json({ error: 'Erro interno ao buscar agendamento' });
  }
};

// ✅ Atualizar agendamento
exports.updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const { date, time, notes, vehicleInfo, status } = req.body;
    
    const appointment = await Scheduling.findOne({
      where: { id, userId }
    });
    
    if (!appointment) {
      return res.status(404).json({ error: 'Agendamento não encontrado' });
    }

    // Verificar se novo horário está disponível (se mudou)
    if (date && time && (date !== appointment.date || time !== appointment.time)) {
      const existingAppointment = await Scheduling.findOne({
        where: {
          date,
          time,
          id: { [Op.ne]: id },
          status: { [Op.ne]: 'cancelled' }
        }
      });

      if (existingAppointment) {
        return res.status(400).json({ error: 'Novo horário já está ocupado' });
      }
    }

    // Atualizar campos
    await appointment.update({
      date: date || appointment.date,
      time: time || appointment.time,
      notes: notes !== undefined ? notes : appointment.notes,
      vehicleInfo: vehicleInfo !== undefined ? vehicleInfo : appointment.vehicleInfo,
      status: status || appointment.status
    });
    
    res.json({
      message: 'Agendamento atualizado com sucesso',
      appointment
    });
  } catch (error) {
    console.error('Erro ao atualizar agendamento:', error);
    res.status(500).json({ error: 'Erro interno ao atualizar agendamento' });
  }
};

// ✅ Cancelar agendamento
exports.cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    
    const appointment = await Scheduling.findOne({
      where: { id, userId }
    });
    
    if (!appointment) {
      return res.status(404).json({ error: 'Agendamento não encontrado' });
    }

    // Atualizar status para cancelado
    await appointment.update({ status: 'cancelled' });
    
    res.json({
      message: 'Agendamento cancelado com sucesso',
      appointment
    });
  } catch (error) {
    console.error('Erro ao cancelar agendamento:', error);
    res.status(500).json({ error: 'Erro interno ao cancelar agendamento' });
  }
};

// ✅ Obter horários disponíveis para uma data
exports.getAvailableSlots = async (req, res) => {
  try {
    const { date } = req.query;
    
    if (!date) {
      return res.status(400).json({ error: 'Data é obrigatória' });
    }
    
    // Horários de funcionamento (8h às 18h)
    const allSlots = [
      '08:00', '09:00', '10:00', '11:00', 
      '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
    ];
    
    // Buscar horários já agendados para a data
    const bookedAppointments = await Scheduling.findAll({
      where: {
        date,
        status: { [Op.ne]: 'cancelled' }
      },
      attributes: ['time']
    });
    
    const bookedTimes = bookedAppointments.map(apt => apt.time);
    const availableSlots = allSlots.filter(slot => !bookedTimes.includes(slot));
    
    res.json({
      date,
      available: availableSlots,
      booked: bookedTimes
    });
  } catch (error) {
    console.error('Erro ao buscar horários disponíveis:', error);
    res.status(500).json({ error: 'Erro interno ao buscar horários' });
  }
};
