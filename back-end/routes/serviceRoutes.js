// Stub: rota de serviços (implemente depois)
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ services: [], message: 'Funcionalidade em desenvolvimento' });
});

module.exports = router;