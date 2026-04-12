// ─────────────────────────────────────────────────────────────────
//  src/api/axios.js
//  Instância central do Axios.
//  O backend do seu amigo só precisa rodar em http://localhost:3000
//  durante o desenvolvimento (o proxy do Vite cuida do CORS).
// ─────────────────────────────────────────────────────────────────
import axios from 'axios'

const api = axios.create({
  baseURL: '/api',          // vite.config.js redireciona para localhost:3000
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// ── Interceptor de REQUEST ──────────────────────────────────────
// Injeta o JWT automaticamente em toda requisição
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('fh_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// ── Interceptor de RESPONSE ─────────────────────────────────────
// Trata erros globais (ex: 401 → redireciona para /login)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('fh_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
