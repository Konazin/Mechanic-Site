import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { getAvailableSlots, createAppointment, getAppointments } from '../api/services'

// ── MOCK appointments já existentes ──────────────────────────────
// O backend deve retornar este formato via GET /appointments
const MOCK_EVENTS = [
  {
    id: '1',
    title: 'Oil Change',
    start: new Date().toISOString().split('T')[0] + 'T09:00:00',
    end:   new Date().toISOString().split('T')[0] + 'T09:30:00',
    backgroundColor: '#4a4a38',
    borderColor: '#3a3a2a',
  },
  {
    id: '2',
    title: 'Engine Diagnostics',
    start: new Date().toISOString().split('T')[0] + 'T14:00:00',
    end:   new Date().toISOString().split('T')[0] + 'T15:00:00',
    backgroundColor: '#5c5c47',
    borderColor: '#4a4a38',
  },
]

export default function Scheduling() {
  const [searchParams]   = useSearchParams()
  const calendarRef       = useRef(null)
  const [events, setEvents]       = useState(MOCK_EVENTS)
  const [selectedDate, setSelectedDate]   = useState(null)
  const [selectedSlot, setSelectedSlot]   = useState(null)
  const [availableSlots, setAvailableSlots] = useState([])
  const [loadingSlots, setLoadingSlots]   = useState(false)
  const [form, setForm] = useState({
    serviceId: searchParams.get('serviceId') || '',
    notes: '',
  })
  const [booking, setBooking]   = useState(false)
  const [success, setSuccess]   = useState(false)
  const [error, setError]       = useState(null)

  // Carrega agendamentos existentes
  useEffect(() => {
    const loadAppointments = async () => {
      try {
        // ── TROCAR pelo real quando o backend estiver pronto: ──
        // const { data } = await getAppointments()
        // setEvents(data.map(apt => ({
        //   id: String(apt.id),
        //   title: apt.service.name,
        //   start: `${apt.date}T${apt.time}`,
        //   backgroundColor: '#4a4a38',
        //   borderColor: '#3a3a2a',
        // })))
        setEvents(MOCK_EVENTS)
      } catch (err) {
        console.error('Failed to load appointments:', err)
      }
    }
    loadAppointments()
  }, [])

  // Ao clicar em uma data no calendário
  const handleDateClick = async (info) => {
    setSelectedDate(info.dateStr)
    setSelectedSlot(null)
    setSuccess(false)
    setError(null)
    setLoadingSlots(true)

    try {
      // ── TROCAR pelo real: ──
      // const { data } = await getAvailableSlots(info.dateStr, form.serviceId)
      // setAvailableSlots(data)

      // Mock de slots disponíveis
      await new Promise((r) => setTimeout(r, 400))
      setAvailableSlots([
        { time: '08:00', available: true },
        { time: '09:00', available: false },
        { time: '10:00', available: true },
        { time: '11:00', available: true },
        { time: '14:00', available: false },
        { time: '15:00', available: true },
        { time: '16:00', available: true },
        { time: '17:00', available: true },
      ])
    } catch (err) {
      setError('Failed to load available slots.')
    } finally {
      setLoadingSlots(false)
    }
  }

  // Submete o agendamento
  const handleBooking = async () => {
    if (!selectedDate || !selectedSlot) {
      setError('Please select a date and time.')
      return
    }
    setBooking(true)
    setError(null)

    try {
      // ── TROCAR pelo real: ──
      // const { data } = await createAppointment({
      //   serviceId: Number(form.serviceId),
      //   date: selectedDate,
      //   time: selectedSlot,
      //   notes: form.notes,
      // })
      // setEvents(prev => [...prev, {
      //   id: String(data.id),
      //   title: data.service.name,
      //   start: `${data.date}T${data.time}`,
      //   backgroundColor: '#5c5c47',
      //   borderColor: '#4a4a38',
      // }])

      await new Promise((r) => setTimeout(r, 800))
      setEvents((prev) => [
        ...prev,
        {
          id: String(Date.now()),
          title: `Appointment @ ${selectedSlot}`,
          start: `${selectedDate}T${selectedSlot}:00`,
          backgroundColor: '#5c5c47',
          borderColor: '#4a4a38',
        },
      ])
      setSuccess(true)
      setSelectedDate(null)
      setSelectedSlot(null)
    } catch (err) {
      setError('Failed to book appointment. Please try again.')
    } finally {
      setBooking(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f0efe8]">
      {/* Header */}
      <div className="bg-olive-900 py-14 px-6 text-center">
        <h1 className="font-display text-4xl text-white tracking-widest mb-2">SCHEDULING</h1>
        <p className="font-body text-olive-200 tracking-wider text-base">
          Click a date to see available time slots
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ── CALENDAR ── */}
        <div className="lg:col-span-2 bg-white rounded-sm shadow-sm border border-olive-100 p-4">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left:   'prev,next today',
              center: 'title',
              right:  'dayGridMonth,timeGridWeek',
            }}
            events={events}
            dateClick={handleDateClick}
            selectable={true}
            height="auto"
            validRange={{ start: new Date().toISOString().split('T')[0] }}
          />
        </div>

        {/* ── BOOKING PANEL ── */}
        <div className="bg-white rounded-sm shadow-sm border border-olive-100 p-6 h-fit">
          <h2 className="font-display text-xl text-olive-900 tracking-widest mb-6 border-b border-olive-100 pb-3">
            BOOK APPOINTMENT
          </h2>

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 font-body text-sm rounded px-4 py-3 mb-4 tracking-wider">
              ✅ Appointment booked successfully!
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 font-body text-sm rounded px-4 py-3 mb-4 tracking-wider">
              {error}
            </div>
          )}

          {/* Selected date display */}
          <div className="mb-4">
            <label className="block font-body text-xs tracking-widest uppercase text-olive-500 mb-1">
              Selected Date
            </label>
            <div className="font-body text-sm text-olive-900 bg-olive-100/50 rounded px-3 py-2 min-h-[36px]">
              {selectedDate || <span className="text-olive-400">Click a date on the calendar</span>}
            </div>
          </div>

          {/* Available slots */}
          {selectedDate && (
            <div className="mb-4">
              <label className="block font-body text-xs tracking-widest uppercase text-olive-500 mb-2">
                Available Times
              </label>
              {loadingSlots ? (
                <div className="flex justify-center py-4">
                  <div className="w-6 h-6 border-2 border-olive-600 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot.time}
                      disabled={!slot.available}
                      onClick={() => setSelectedSlot(slot.time)}
                      className={`font-body text-xs py-2 rounded transition-colors tracking-wider
                        ${!slot.available
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                          : selectedSlot === slot.time
                            ? 'bg-olive-700 text-white'
                            : 'bg-olive-100 text-olive-700 hover:bg-olive-200'
                        }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Notes */}
          <div className="mb-6">
            <label className="block font-body text-xs tracking-widest uppercase text-olive-500 mb-1">
              Notes (optional)
            </label>
            <textarea
              rows={3}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Describe the issue or service needed..."
              className="w-full font-body text-sm text-olive-900 bg-olive-50 border border-olive-200
                         rounded px-3 py-2 resize-none focus:outline-none focus:border-olive-500 transition-colors"
            />
          </div>

          <button
            onClick={handleBooking}
            disabled={booking || !selectedDate || !selectedSlot}
            className={`w-full btn-primary py-3 text-sm tracking-widest
              ${(booking || !selectedDate || !selectedSlot) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {booking ? 'Booking...' : 'Confirm Booking'}
          </button>
        </div>
      </div>
    </div>
  )
}
