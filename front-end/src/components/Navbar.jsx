import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../api/services'

export default function Navbar() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  const handleLogout = () => {
    authService.logout()
    navigate('/login')
  }

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          🔧 Mechanic Pro
        </Link>
        
        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-gray-300">Início</Link>
          <Link to="/services" className="hover:text-gray-300">Serviços</Link>
          <Link to="/about" className="hover:text-gray-300">Sobre</Link>
          
          {token ? (
            <>
              <Link to="/scheduling" className="hover:text-gray-300">Agendar</Link>
              <Link to="/dashboard" className="hover:text-gray-300">
                Olá, {user?.name?.split(' ')[0]}
              </Link>
              <button 
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300">Entrar</Link>
              <Link 
                to="/register" 
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
              >
                Cadastrar
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}