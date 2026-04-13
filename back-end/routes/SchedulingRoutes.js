const express = require('express');
const router = express.Router();

const authMiddleware        = require('../middlewares/authMiddleware');
const schedulingController  = require('../controllers/schedulingController');

// Todas as rotas exigem autenticação
router.use(authMiddleware);

// Rotas específicas ANTES de rotas com parâmetros dinâmicos
router.get('/available', schedulingController.getAvailableSlots);

// CRUD
router.post('/',    schedulingController.createAppointment);
router.get('/',     schedulingController.getAppointments);
router.get('/:id',  schedulingController.getAppointmentById);
router.put('/:id',  schedulingController.updateAppointment);
router.delete('/:id', schedulingController.cancelAppointment);

module.exports = router;
