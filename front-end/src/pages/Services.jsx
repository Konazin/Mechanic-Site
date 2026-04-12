import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getServices } from '../api/services'

// ── MOCK DATA ─────────────────────────────────────────────────────
// Usado enquanto o backend não está pronto.
// Quando o backend estiver ativo, remova o MOCK e use a chamada real.
const MOCK_SERVICES = [
  {
    id: 1,
    name: 'Engine Diagnostics',
    description: 'Complete engine scanning and fault diagnosis using professional equipment.',
    price: 150,
    duration_minutes: 60,
    category: 'Diagnostics',
  },
  {
    id: 2,
    name: 'Oil Change',
    description: 'Full synthetic oil change with filter replacement and fluid top-up.',
    price: 80,
    duration_minutes: 30,
    category: 'Maintenance',
  },
  {
    id: 3,
    name: 'Brake Service',
    description: 'Brake pad replacement, rotor inspection and hydraulic fluid check.',
    price: 220,
    duration_minutes: 90,
    category: 'Safety',
  },
  {
    id: 4,
    name: 'Suspension Check',
    description: 'Full suspension inspection including shocks, struts and alignment.',
    price: 180,
    duration_minutes: 75,
    category: 'Safety',
  },
  {
    id: 5,
    name: 'AC Service',
    description: 'Air conditioning recharge, leak test and compressor inspection.',
    price: 200,
    duration_minutes: 60,
    category: 'Comfort',
  },
  {
    id: 6,
    name: 'Full Revision',
    description: '50-point vehicle inspection — the complete checkup for peace of mind.',
    price: 350,
    duration_minutes: 180,
    category: 'Maintenance',
  },
]

const categoryColors = {
  Diagnostics: 'bg-blue-100 text-blue-800',
  Maintenance:  'bg-olive-100 text-olive-700',
  Safety:       'bg-red-100 text-red-800',
  Comfort:      'bg-green-100 text-green-800',
}

export default function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        // ── TROCAR PELO REAL quando o backend estiver pronto: ──
        // const { data } = await getServices()
        // setServices(data)

        // Simulando delay de rede com mock
        await new Promise((r) => setTimeout(r, 600))
        setServices(MOCK_SERVICES)
      } catch (err) {
        setError('Failed to load services. Please try again.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  return (
    <div className="min-h-screen bg-[#f0efe8]">
      {/* Header */}
      <div className="bg-olive-900 py-14 px-6 text-center">
        <h1 className="font-display text-4xl text-white tracking-widest mb-2">OUR SERVICES</h1>
        <p className="font-body text-olive-200 tracking-wider text-base">
          Professional care for every vehicle
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-olive-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded px-6 py-4 text-center font-body">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-sm shadow-sm border border-olive-100 hover:shadow-md transition-shadow overflow-hidden group"
              >
                {/* card top accent */}
                <div className="h-1 bg-olive-700 group-hover:bg-olive-500 transition-colors" />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <span className={`text-xs font-body font-semibold tracking-widest px-2 py-1 rounded-sm uppercase ${categoryColors[service.category] || 'bg-gray-100 text-gray-600'}`}>
                      {service.category}
                    </span>
                    <span className="font-display text-xl text-olive-700">
                      R$ {service.price}
                    </span>
                  </div>

                  <h3 className="font-display text-xl text-olive-900 tracking-wide mb-2">
                    {service.name}
                  </h3>
                  <p className="font-body text-sm text-gray-600 leading-relaxed mb-4">
                    {service.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="font-body text-xs text-olive-500 tracking-wider">
                      ⏱ {service.duration_minutes} min
                    </span>
                    <Link
                      to={`/scheduling?serviceId=${service.id}`}
                      className="font-body text-sm font-semibold text-olive-700 hover:text-olive-500 tracking-wider transition-colors"
                    >
                      Book →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
