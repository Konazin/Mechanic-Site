const express = require('express');
const router  = express.Router();
const db      = require('../db/database');

//Middleware de indentificação
//utilizar em todas as rotas protegidas
function autenticado(req, res, next){
  if (!req.session.usuario) return res.redirect('login');
  next()
}
router.get('/',(req, res) =>{
  const servicos = db.prepare('SELECT * FROM servicos').all()
  res.render('home',{
    usuario: req.session.usuario || null,
    servicos,
  });
})
router.get('/dashboard', autenticado, (req, res) => {
  const agendamentos = db.prepare(`
    SELECT * FROM agendamentos
    WHERE usuario_id = ?
    ORDER BY criado_em DESC`).all(req.session.usuario.id);
  res.render('dashboard', {
    usuario: req.session.usuario, agendamentos,
  });
});

router.get('/agendar', autenticado, (req, res) => {
  const servicos = db.prepare('SELECT * FROM servicos').all();
  res.render('agendar',{ 
    usuario: req.session.usuario,
    servicos,
    erro: null,
    sucesso: null
  });
});

router.post('/agendar', autenticado, (req, res)=>{
  const {nome_cliente, telefone, veiculo, servico, data_agendamento} = req.body;
  const servicos = db.prepare('SELECT * FROM servicos').all();

  if(!nome_cliente || !telefone || !veiculo || !servico || !data_agendamento){
    return res.render('agendar', {
      usuario: req.session.usuario,
      servicos,
      erro: "Fill all Fields.",
      sucesso: null,
    });
  }
  db.prepare(`INSERT INTO agendamentos
      (usuario_id, nome_cliente, telefone, veiculo, servico, data_agendamento)
    VALUES (?, ?, ?, ?, ?, ?)`).run(req.session.usuario.id, nome_cliente, telefone, veiculo, servico, data_agendamento);
  
  res.render('agendar', {
    usuario: req.session.usuario,
    servicos,
    erro: null,
    sucesso: 'Scheduling successful!'
  });
});

router.post('/cancelar/:id', autenticado, (req, res) =>{
  db.prepare(`UPDATE agendamentos
    SET status = 'cancelado'
    WHERE id = ? AND usuario_id = ?`).run(req.params.id, req.session.usuario.id);
  
  res.redirect('/dashboard');
})

module.exports = router;