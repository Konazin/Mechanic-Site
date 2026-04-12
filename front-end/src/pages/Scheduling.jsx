// front-end/src/pages/Scheduling.jsx
import { useState, useEffect } from 'react'
import { 
  getAppointments, 
  getAvailableSlots, 
  createAppointment, 
  cancelAppointment,
  authService 
} from '../api/services'

export default function Scheduling() {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    vehicleInfo: '',
    notes: ''
  })
  const [availableSlots, setAvailableSlots] = useState([])
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  
  // Data mínima = hoje (evita datas inválidas como 0002-03-20)
  const today = new Date().toISOString().split('T')[0]

  useEffect(() => {
    if (authService.isAuthenticated()) {
      loadAppointments()
    }
  }, [])

  useEffect(() => {
    // Só carrega horários se a data for válida (YYYY-MM-DD e >= hoje)
    if (formData.date && formData.date >= today) {
      loadAvailableSlots(formData.date)
    } else {
      setAvailableSlots([])
    }
  }, [formData.date])

  const loadAppointments = async () => {
    try {
      const response = await getAppointments()
      // ✅ Acessa .data porque axios retorna { data, status, ... }
      setAppointments(response.data || [])
    } catch (error) {
      console.error('Erro ao carregar agendamentos:', error)
      setMessage({ type: 'error', text: 'Não foi possível carregar seus agendamentos' })
    }
  }

  const loadAvailableSlots = async (date) => {
    try {
      const response = await getAvailableSlots(date)
      setAvailableSlots(response.data?.available || [])
    } catch (error) {
      console.error('Erro ao carregar horários:', error)
      // Fallback: mostra horários padrão se a API falhar
      setAvailableSlots(['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validação extra de data
    if (!formData.date || formData.date < today) {
      return setMessage({ type: 'error', text: 'Selecione uma data válida' })
    }
    if (!formData.time) {
      return setMessage({ type: 'error', text: 'Selecione um horário' })
    }

    setLoading(true)
    setMessage({ type: '', text: '' })

    try {
      await createAppointment(formData)
      setMessage({ type: 'success', text: '✅ Agendamento realizado com sucesso!' })
      
      // Reset + recarrega lista
      setFormData({ date: '', time: '', vehicleInfo: '', notes: '' })
      await loadAppointments()
    } catch (error) {
      console.error('Erro ao agendar:', error)
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.error || '❌ Erro ao agendar. Tente outro horário.' 
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = async (id) => {
    if (!window.confirm('Cancelar este agendamento?')) return
    try {
      await cancelAppointment(id)
      setMessage({ type: 'success', text: 'Agendamento cancelado' })
      await loadAppointments()
    } catch {
      setMessage({ type: 'error', text: 'Erro ao cancelar' })
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const [year, month, day] = dateString.split('-')
    return `${day}/${month}/${year}`
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">📅 Agendar Serviço</h1>

      {message.text && (
        <div className={`p-4 rounded mb-6 ${
          message.type === 'success' 
            ? 'bg-green-100 text-green-800 border border-green-400' 
            : 'bg-red-100 text-red-800 border border-red-400'
        }`}>
          {message.text}
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Novo Agendamento</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Data *</label>
              <input
                type="date"
                name="date"
                required
                min={today}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.date}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Horário *</label>
              <select
                name="time"
                required
                disabled={!formData.date || availableSlots.length === 0}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                value={formData.time}
                onChange={handleChange}
              >
                <option value="">
                  {!formData.date ? 'Selecione uma data' : 
                   availableSlots.length === 0 ? 'Sem horários' : 'Selecione o horário'}
                </option>
                {availableSlots.map(slot => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Veículo (opcional)</label>
            <input
              type="text"
              name="vehicleInfo"
              placeholder="Ex: Gol 2020 - ABC-1234"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              value={formData.vehicleInfo}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Observações</label>
            <textarea
              name="notes"
              rows={3}
              placeholder="Descreva o serviço necessário..."
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              value={formData.notes}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !formData.date || !formData.time}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md disabled:opacity-50"
          >
            {loading ? 'Agendando...' : 'Confirmar Agendamento'}
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Meus Agendamentos</h2>
        
        {appointments.length === 0 ? (
          <p className="text-gray-500">Nenhum agendamento encontrado.</p>
        ) : (
          <div className="space-y-3">
            {appointments.map(appt => (
              <div key={appt.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">🗓️ {formatDate(appt.date)} às {appt.time}</p>
                  {appt.vehicleInfo && <p className="text-sm text-gray-600">🚗 {appt.vehicleInfo}</p>}
                  {appt.notes && <p className="text-sm text-gray-500">📝 {appt.notes}</p>}
                  <span className={`inline-block mt-2 px-2 py-1 text-xs rounded ${
                    appt.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    appt.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {appt.status === 'pending' ? '⏳ Pendente' :
                     appt.status === 'confirmed' ? '✅ Confirmado' :
                     appt.status === 'cancelled' ? '❌ Cancelado' : '🏁 Concluído'}
                  </span>
                </div>
                {appt.status === 'pending' && (
                  <button onClick={() => handleCancel(appt.id)} className="text-red-600 hover:text-red-800 text-sm">
                    Cancelar
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}