const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'mecanica.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    nome       TEXT NOT NULL,
    email      TEXT UNIQUE NOT NULL,
    senha      TEXT NOT NULL,
    criado_em  DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS servicos (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    nome       TEXT NOT NULL,
    descricao  TEXT,
    preco_base REAL NOT NULL
  );

  CREATE TABLE IF NOT EXISTS agendamentos (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id       INTEGER,
    nome_cliente     TEXT NOT NULL,
    telefone         TEXT NOT NULL,
    veiculo          TEXT NOT NULL,
    servico          TEXT NOT NULL,
    data_agendamento TEXT NOT NULL,
    status           TEXT DEFAULT 'pendente',
    criado_em        DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
  );
`);

const qtd = db.prepare('SELECT COUNT(*) as n FROM servicos').get();
if (qtd.n === 0) {
  const ins = db.prepare(
    'INSERT INTO servicos (nome, descricao, preco_base) VALUES (?, ?, ?)'
  );
  [
    ['Troca de Óleo',             'Troca completa com filtro incluso e revisão de níveis.', 120],
    ['Alinhamento e Balanceamento','Correção do eixo e equilíbrio das quatro rodas.',       150],
    ['Revisão Completa',          'Verificação geral de todos os sistemas do veículo.',     450],
    ['Troca de Freios',           'Substituição de pastilhas, discos e fluido de freio.',  280],
    ['Suspensão',                 'Diagnóstico e reparo completo da suspensão.',            350],
    ['Ar Condicionado',           'Carga, limpeza e manutenção do sistema de A/C.',        200]].forEach(s => ins.run(...s));
}

module.exports = db;