// front-end/src/api/services.js
import api from './axios'

// 🔹 EXPORTAÇÕES INDIVIDUAIS (preferido)
export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials)
  if (response.data.token) {
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('user', JSON.stringify(response.data.user || {}))
  }
  return response.data
}
export const register = (userData) => api.post('/users', userData)
export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}
export const getCurrentUser = () => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}
export const isAuthenticated = () => !!localStorage.getItem('token')

export const getAllUsers = () => api.get('/users')
export const getUserById = (id) => api.get(`/users/${id}`)

export const getServices = () => api.get('/services')
export const getServiceById = (id) => api.get(`/services/${id}`)
export const createService = (data) => api.post('/services', data)

// 📅 Agendamentos - NOMES EXATOS que o componente espera
export const getAppointments = (params = {}) => api.get('/scheduling', { params })
export const getAvailableSlots = (date) => api.get(`/scheduling/available?date=${date}`)
export const createAppointment = (data) => api.post('/scheduling', data)
export const cancelAppointment = (id) => api.delete(`/scheduling/${id}`)
export const updateAppointment = (id, data) => api.put(`/scheduling/${id}`, data)

// 🔹 OBJETOS AGRUPADOS (compatibilidade) - COM NOMES CORRETOS
export const authService = { login, register, logout, getCurrentUser, isAuthenticated }
export const userService = { getAll: getAllUsers, getById: getUserById }
export const serviceService = { getAll: getServices, getById: getServiceById, create: createService }

// ✅ schedulingService com os nomes que o Scheduling.jsx espera
export const schedulingService = {
  getAppointments,      // ← Era 'getAll', agora é 'getAppointments'
  getAvailableSlots,
  createAppointment,    // ← Era 'create', agora é 'createAppointment'
  cancelAppointment,    // ← Era 'cancel', agora é 'cancelAppointment'
  updateAppointment
}