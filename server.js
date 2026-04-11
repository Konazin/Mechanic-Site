const express = require('express');
const session = require('express-session');
const path    = require('path');

const app  = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: 'troque-por-uma-chave-secreta-forte',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 2 
  }
}));

app.use('/', require('./routes/auth'));
app.use('/', require('./routes/main'));

app.listen(PORT, () => {
  console.log(`\n Servidor rodando em http://localhost:${PORT}\n`);
});
