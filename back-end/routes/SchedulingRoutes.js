// back-end/routes/schedulingRoutes.js
const express = require('express');
const router = express.Router();

// Imports
const authMiddleware = require('../middlewares/authMiddleware');
const schedulingController = require('../controllers/schedulingController');

console.log('🔹 schedulingRoutes carregada'); // ← Log de confirmação

// Todas as rotas são protegidas
router.use(authMiddleware);

// CRUD de agendamentos
router.post('/', schedulingController.createAppointment);
router.get('/', schedulingController.getAppointments);
router.get('/:id', schedulingController.getAppointmentById);
router.put('/:id', schedulingController.updateAppointment);
router.delete('/:id', schedulingController.cancelAppointment);

// Horários disponíveis
router.get('/available', schedulingController.getAvailableSlots);

module.exports = router;