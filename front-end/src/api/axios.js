// front-end/src/api/axios.js
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
})

// Interceptor de request: adiciona token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      
      // ✅ CORRIGIDO: Só loga em desenvolvimento
      if (import.meta.env.DEV) {
        console.log('🔑 Token enviado:', token.substring(0, 20) + '...')
      }
    }
    return config
  },
  (error) => {
    console.error('❌ Erro no interceptor request:', error)
    return Promise.reject(error)
  }
)

// Interceptor de response: trata erros 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token inválido ou expirado
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      
      // Redirecionar para login apenas se não estiver já na página de login
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default api
