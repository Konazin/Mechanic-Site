const express = require('express');
const router = express.Router();

const authRoutes       = require('./authRoutes');
const userRoutes       = require('./userRoutes');
const schedulingRoutes = require('./schedulingRoutes');
const serviceRoutes    = require('./serviceRoutes');

router.use('/auth',       authRoutes);
router.use('/users',      userRoutes);
router.use('/scheduling', schedulingRoutes);
router.use('/services',   serviceRoutes);

module.exports = router;