# 🐴 Flying Horse Mechanics — Frontend

React + Vite frontend for the Flying Horse Mechanics website.

---

## 🚀 Getting Started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # produção → dist/
npm run preview   # preview do build
```

---

## 📁 Project Structure

```
src/
├── api/
│   ├── axios.js        # Instância do Axios + interceptors (JWT, 401)
│   └── services.js     # Todas as chamadas ao backend
├── components/
│   ├── Navbar.jsx
│   └── Footer.jsx
├── pages/
│   ├── Home.jsx
│   ├── Services.jsx
│   ├── Scheduling.jsx  # FullCalendar + agendamento
│   ├── About.jsx
│   └── Login.jsx
├── App.jsx             # React Router
├── main.jsx
└── index.css           # Tailwind + FullCalendar theme
```

---

## 🔗 Proxy de desenvolvimento

O `vite.config.js` redireciona `/api/*` → `http://localhost:3000/*`.
Isso resolve CORS durante o dev sem precisar configurar o backend para aceitar `localhost:5173`.

---

## 🛠️ DOCUMENTAÇÃO DO BACKEND

> Para o desenvolvedor backend. O frontend espera um servidor REST
> rodando em **http://localhost:3000** durante o desenvolvimento.

---

### Stack sugerida para o backend
- **Node.js** com Express ou Fastify
- **PostgreSQL** ou MySQL como banco de dados
- **JWT** para autenticação
- **bcrypt** para hash de senhas

---

### 🔐 AUTH

#### `POST /auth/login`
```json
// Body
{ "email": "user@example.com", "password": "senha123" }

// Response 200
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { "id": 1, "name": "João Silva", "email": "user@example.com", "role": "client" }
}

// Response 401
{ "message": "Invalid credentials" }
```

#### `POST /auth/register`
```json
// Body
{ "name": "João Silva", "email": "user@example.com", "password": "senha123", "phone": "85999990000" }

// Response 201
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { "id": 2, "name": "João Silva", "email": "user@example.com", "role": "client" }
}
```

#### `POST /auth/logout`
```
Headers: Authorization: Bearer <token>
Response 200: { "message": "Logged out successfully" }
```

---

### 🔧 SERVICES (Serviços da oficina)

#### `GET /services`
```json
// Response 200 — array de serviços
[
  {
    "id": 1,
    "name": "Engine Diagnostics",
    "description": "Complete engine scanning and fault diagnosis.",
    "price": 150.00,
    "duration_minutes": 60,
    "category": "Diagnostics"
  },
  {
    "id": 2,
    "name": "Oil Change",
    "description": "Full synthetic oil change with filter replacement.",
    "price": 80.00,
    "duration_minutes": 30,
    "category": "Maintenance"
  }
]
```

#### `GET /services/:id`
```json
// Response 200
{
  "id": 1,
  "name": "Engine Diagnostics",
  "description": "Complete engine scanning and fault diagnosis.",
  "price": 150.00,
  "duration_minutes": 60,
  "category": "Diagnostics"
}

// Response 404
{ "message": "Service not found" }
```

---

### 📅 APPOINTMENTS (Agendamentos)

#### `GET /appointments/slots?date=YYYY-MM-DD&serviceId=1`
> Retorna os horários disponíveis para uma data e serviço.
```json
// Response 200
[
  { "time": "08:00", "available": true },
  { "time": "09:00", "available": false },
  { "time": "10:00", "available": true },
  { "time": "11:00", "available": true },
  { "time": "14:00", "available": false },
  { "time": "15:00", "available": true },
  { "time": "16:00", "available": true },
  { "time": "17:00", "available": true }
]
```

#### `GET /appointments`
> Lista os agendamentos do usuário autenticado.
```
Headers: Authorization: Bearer <token>
```
```json
// Response 200
[
  {
    "id": 10,
    "service": { "id": 1, "name": "Engine Diagnostics" },
    "date": "2024-08-15",
    "time": "10:00",
    "status": "confirmed",
    "mechanic": "Carlos Mendes",
    "notes": "Car making noise on startup"
  }
]
```

#### `POST /appointments`
> Cria um novo agendamento.
```
Headers: Authorization: Bearer <token>
```
```json
// Body
{
  "serviceId": 1,
  "date": "2024-08-15",
  "time": "10:00",
  "notes": "Car making noise on startup"
}

// Response 201
{
  "id": 10,
  "service": { "id": 1, "name": "Engine Diagnostics" },
  "date": "2024-08-15",
  "time": "10:00",
  "status": "pending",
  "notes": "Car making noise on startup"
}

// Response 409 — horário já ocupado
{ "message": "Time slot not available" }
```

#### `PUT /appointments/:id`
> Atualiza (reagenda) um agendamento existente.
```
Headers: Authorization: Bearer <token>
```
```json
// Body (todos opcionais)
{
  "date": "2024-08-20",
  "time": "14:00",
  "notes": "Updated notes"
}

// Response 200
{ "id": 10, "date": "2024-08-20", "time": "14:00", "status": "confirmed" }
```

#### `DELETE /appointments/:id`
> Cancela um agendamento.
```
Headers: Authorization: Bearer <token>
Response 200: { "message": "Appointment cancelled" }
Response 403: { "message": "Not authorized" }
```

#### `GET /appointments/all`  _(admin only)_
> Retorna todos os agendamentos de todos os clientes.
```
Headers: Authorization: Bearer <admin_token>
```
```json
// Response 200
[
  {
    "id": 10,
    "client": { "id": 1, "name": "João Silva", "email": "user@example.com" },
    "service": { "id": 1, "name": "Engine Diagnostics" },
    "date": "2024-08-15",
    "time": "10:00",
    "status": "confirmed",
    "mechanic": "Carlos Mendes"
  }
]
```

---

### ✉️ CONTACT

#### `POST /contact`
```json
// Body
{
  "name": "João Silva",
  "email": "user@example.com",
  "phone": "85999990000",
  "message": "I need to schedule a full revision."
}

// Response 200
{ "message": "Message sent successfully" }
```

---

### 📋 Database Schema sugerido (PostgreSQL)

```sql
-- Usuários
CREATE TABLE users (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(150) UNIQUE NOT NULL,
  password   VARCHAR(255) NOT NULL,  -- bcrypt hash
  phone      VARCHAR(20),
  role       VARCHAR(20) DEFAULT 'client', -- 'client' | 'mechanic' | 'admin'
  created_at TIMESTAMP DEFAULT NOW()
);

-- Serviços
CREATE TABLE services (
  id                SERIAL PRIMARY KEY,
  name              VARCHAR(100) NOT NULL,
  description       TEXT,
  price             DECIMAL(10,2) NOT NULL,
  duration_minutes  INT NOT NULL,
  category          VARCHAR(50),
  active            BOOLEAN DEFAULT TRUE
);

-- Agendamentos
CREATE TABLE appointments (
  id          SERIAL PRIMARY KEY,
  user_id     INT REFERENCES users(id) ON DELETE CASCADE,
  service_id  INT REFERENCES services(id),
  mechanic_id INT REFERENCES users(id),
  date        DATE NOT NULL,
  time        TIME NOT NULL,
  status      VARCHAR(20) DEFAULT 'pending', -- 'pending'|'confirmed'|'done'|'cancelled'
  notes       TEXT,
  created_at  TIMESTAMP DEFAULT NOW(),
  UNIQUE(date, time, mechanic_id)  -- evita double-booking
);
```

---

### 🔑 JWT — padrão esperado

O frontend envia o token em **toda** requisição autenticada:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Se o backend retornar **401**, o frontend remove o token e redireciona para `/login` automaticamente.

---

### 🌐 CORS

O backend precisa aceitar requisições de `http://localhost:5173` durante o desenvolvimento.

```js
// Express
const cors = require('cors')
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
```

> Em produção, troque a `baseURL` do axios para a URL real do servidor.
