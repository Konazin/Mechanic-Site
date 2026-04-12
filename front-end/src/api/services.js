// ─────────────────────────────────────────────────────────────────
//  src/api/services.js
//  Todas as chamadas ao backend organizadas por domínio.
//
//  ✅ PARA O BACKEND:
//  Cada função documenta a rota esperada, método HTTP,
//  payload e formato de resposta.
// ─────────────────────────────────────────────────────────────────
import api from './axios'

// ══════════════════════════════════════════════════════════════════
//  AUTH
//  Rotas: POST /auth/login  |  POST /auth/register  |  POST /auth/logout
// ══════════════════════════════════════════════════════════════════

/**
 * Login do usuário
 * POST /auth/login
 * Body: { email: string, password: string }
 * Response: { token: string, user: { id, name, email, role } }
 */
export const authLogin = (credentials) =>
  api.post('/auth/login', credentials)

/**
 * Registro de novo usuário
 * POST /auth/register
 * Body: { name: string, email: string, password: string, phone: string }
 * Response: { token: string, user: { id, name, email, role } }
 */
export const authRegister = (data) =>
  api.post('/auth/register', data)

/**
 * Logout (invalida token no servidor)
 * POST /auth/logout
 * Headers: Authorization: Bearer <token>
 */
export const authLogout = () =>
  api.post('/auth/logout')


// ══════════════════════════════════════════════════════════════════
//  SERVICES (Serviços da oficina)
//  Rotas: GET /services  |  GET /services/:id
// ══════════════════════════════════════════════════════════════════

/**
 * Lista todos os serviços disponíveis
 * GET /services
 * Response: [{ id, name, description, price, duration_minutes, category }]
 */
export const getServices = () =>
  api.get('/services')

/**
 * Busca um serviço específico
 * GET /services/:id
 * Response: { id, name, description, price, duration_minutes, category }
 */
export const getServiceById = (id) =>
  api.get(`/services/${id}`)


// ══════════════════════════════════════════════════════════════════
//  APPOINTMENTS (Agendamentos)
//  Rotas:
//    GET    /appointments          → lista do usuário logado
//    POST   /appointments          → cria novo agendamento
//    PUT    /appointments/:id      → atualiza agendamento
//    DELETE /appointments/:id      → cancela agendamento
//    GET    /appointments/slots    → horários disponíveis
// ══════════════════════════════════════════════════════════════════

/**
 * Lista os agendamentos do usuário logado
 * GET /appointments
 * Response: [{ id, service, date, time, status, mechanic }]
 */
export const getAppointments = () =>
  api.get('/appointments')

/**
 * Busca slots (horários) disponíveis para uma data
 * GET /appointments/slots?date=YYYY-MM-DD&serviceId=123
 * Response: [{ time: "09:00", available: true }]
 */
export const getAvailableSlots = (date, serviceId) =>
  api.get('/appointments/slots', { params: { date, serviceId } })

/**
 * Cria um novo agendamento
 * POST /appointments
 * Body: { serviceId: number, date: "YYYY-MM-DD", time: "HH:MM", notes?: string }
 * Response: { id, service, date, time, status: "pending" }
 */
export const createAppointment = (data) =>
  api.post('/appointments', data)

/**
 * Atualiza um agendamento (ex: reagendar)
 * PUT /appointments/:id
 * Body: { date?: string, time?: string, notes?: string }
 * Response: { id, service, date, time, status }
 */
export const updateAppointment = (id, data) =>
  api.put(`/appointments/${id}`, data)

/**
 * Cancela um agendamento
 * DELETE /appointments/:id
 * Response: { message: "Appointment cancelled" }
 */
export const cancelAppointment = (id) =>
  api.delete(`/appointments/${id}`)

/**
 * Busca TODOS os agendamentos (admin/mecânico)
 * GET /appointments/all
 * Headers: Authorization: Bearer <admin_token>
 * Response: [{ id, client, service, date, time, status, mechanic }]
 */
export const getAllAppointments = () =>
  api.get('/appointments/all')


// ══════════════════════════════════════════════════════════════════
//  CONTACT
//  Rota: POST /contact
// ══════════════════════════════════════════════════════════════════

/**
 * Envia mensagem de contato
 * POST /contact
 * Body: { name: string, email: string, phone: string, message: string }
 * Response: { message: "Message sent successfully" }
 */
export const sendContact = (data) =>
  api.post('/contact', data)
