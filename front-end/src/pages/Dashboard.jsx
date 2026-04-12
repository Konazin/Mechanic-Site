import { useState, useEffect } from 'react'
import { getCurrentUser, getAppointments } from '../api/services'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadData = async () => {
      try {
        setUser(getCurrentUser())
        
        // ✅ Busca real na API (com extração correta do .data do Axios)
        const response = await getAppointments()
        setAppointments(response.data || [])
      } catch (err) {
        console.error('Erro ao carregar dashboard:', err)
        setError('Não foi possível carregar seus agendamentos.')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // 📅 Lógica para encontrar o próximo agendamento (pendente/confirmado e data >= hoje)
  const today = new Date().toISOString().split('T')[0]
  const nextAppointment = appointments
    .filter(a => (a.status === 'pending' || a.status === 'confirmed') && a.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))[0]

  const formatDate = (dateString) => {
    if (!dateString) return '-'
    const [year, month, day] = dateString.split('-')
    return `${day}/${month}/${year}`
  }

  if (loading) return <div className="p-8 text-center text-gray-500">Carregando dashboard...</div>
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Bem-vindo, {user?.name || 'Usuário'}!
        </h1>
        <p className="mt-2 text-gray-600">Resumo da sua conta e agendamentos.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900">Total de Agendamentos</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">{appointments.length}</p>
        </div>
        
        {/* Card 2: Próximo Agendamento */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900">Próximo Agendamento</h3>
          <p className="text-gray-600 mt-2 font-medium">
            {nextAppointment 
              ? `🗓️ ${formatDate(nextAppointment.date)} às ${nextAppointment.time}` 
              : 'Nenhum agendamento futuro'}
          </p>
          {nextAppointment && (
            <span className={`inline-block mt-2 px-2 py-1 text-xs rounded ${
              nextAppointment.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {nextAppointment.status === 'pending' ? '⏳ Pendente' : '✅ Confirmado'}
            </span>
          )}
        </div>
        
        {/* Card 3 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900">Perfil</h3>
          <p className="text-gray-600 mt-2">{user?.email}</p>
          <p className="text-sm text-gray-500 mt-1">
            Cadastro: {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}
          </p>
        </div>
      </div>

      {/* Tabela de Agendamentos Recentes */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Últimos Agendamentos</h2>
        {appointments.length === 0 ? (
          <p className="text-gray-500">Você ainda não possui agendamentos.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Horário</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Veículo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {appointments.slice(0, 5).map(appt => (
                  <tr key={appt.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{formatDate(appt.date)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{appt.time}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{appt.vehicleInfo || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded ${
                        appt.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        appt.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {appt.status === 'pending' ? 'Pendente' : appt.status === 'confirmed' ? 'Confirmado' : 'Cancelado'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}