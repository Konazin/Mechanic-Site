// back-end/routes/SchedulingRoutes.js
const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const schedulingController = require('../controllers/schedulingController');

// Todas as rotas são protegidas
router.use(authMiddleware);

// ✅ ORDEM CORRETA: rotas específicas ANTES de rotas com parâmetros
// Horários disponíveis (deve vir ANTES de /:id)
router.get('/available', schedulingController.getAvailableSlots);

// CRUD de agendamentos
router.post('/', schedulingController.createAppointment);
router.get('/', schedulingController.getAppointments);
router.get('/:id', schedulingController.getAppointmentById);
router.put('/:id', schedulingController.updateAppointment);
router.delete('/:id', schedulingController.cancelAppointment);

module.exports = router;
