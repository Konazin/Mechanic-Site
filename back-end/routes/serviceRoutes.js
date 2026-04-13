const express = require('express');
const router = express.Router();
 
// Stub: liste os serviços oferecidos pela oficina
// Substitua pelos dados reais ou por um model quando implementar
const SERVICES = [
  { id: 1, name: 'Troca de óleo',         duration: 30, price: 80 },
  { id: 2, name: 'Alinhamento',           duration: 60, price: 120 },
  { id: 3, name: 'Balanceamento',         duration: 45, price: 90 },
  { id: 4, name: 'Revisão geral',         duration: 120, price: 250 },
  { id: 5, name: 'Troca de pastilhas',    duration: 60, price: 180 },
];
 
router.get('/', (req, res) => {
  res.json({ services: SERVICES });
});
 
router.get('/:id', (req, res) => {
  const service = SERVICES.find(s => s.id === Number(req.params.id));
  if (!service) {
    return res.status(404).json({ error: 'Serviço não encontrado' });
  }
  res.json(service);
});
 
module.exports = router;
 