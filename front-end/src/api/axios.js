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
      console.log('🔑 Token enviado:', token.substring(0, 20) + '...')
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
      console.warn('⚠️ Token inválido/expirado, limpando localStorage')
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      // Não redirecione aqui para não criar loop
    }
    return Promise.reject(error)
  }
)

export default api