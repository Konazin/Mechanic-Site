const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');
const db      = require('../db/database');

// GET /login
router.get('/login', (req, res) => {
  if(req.session.usuario) return res.redirect('/dashboard');
  res.render('login', {erro: null, sucesso: null});
})

// POST /login
router.post('/login', (req, res) => {
  const { email, senha } = req.body;
  const usuario = db.prepare('SELECT * FROM usuarios WHERE email = ?').get(email);
  
  if (!email || !senha){
    return res.render('login', {erro : 'Fill all fields'});
  }

  if(!usuario){
    return res.render('login', {erro : 'Invalid Email or Password', sucesso: null});
  }

  const senhaCorreta = bcrypt.compareSync(senha, usuario.senha);
  if (!senhaCorreta){
    return res.render('login', {erro : 'Invalid Email or Password', sucesso: null})
  }
  req.session.usuario = {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
  };

  res.redirect('/dashboard');
});

// GET cadastro
router.get('/cadastro', (req, res) => {
  if(req.session.usuario) return res.redirect('/dashboard');
  res.render('cadastro', {erro: null});
});

//POST cadastro
router.post('/cadastro', (req, res) => {
  const {nome, email, senha} = req.body;
  const hash = bcrypt.hashSync(senha, 10)

  if (!nome || !email || !senha){
    return res.render('cadastro', {erro: 'Fill all Fields'});
  }

  const existe = db.prepare('SELECT id FROM usuarios WHERE email = ?').get(email);
  if(existe){
    return res.render('cadastro', {erro: 'The email already exists'});
  }

  db.prepare('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)')
  .run(nome, email, hash)

  res.render('login', {erro: null, sucesso: 'Account created! Do login'});
})

//GET logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
})

module.exports = router;