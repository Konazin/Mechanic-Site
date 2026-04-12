import { Link } from 'react-router-dom'

const TEAM = [
  {
    name: 'Carlos Mendes',
    role: 'Head Mechanic',
    experience: '15 years',
    specialty: 'Engine & Transmission',
    initials: 'CM',
  },
  {
    name: 'Rafael Souza',
    role: 'Electrical Specialist',
    experience: '10 years',
    specialty: 'Electronics & Diagnostics',
    initials: 'RS',
  },
  {
    name: 'Bruno Lima',
    role: 'Suspension & Brakes',
    experience: '8 years',
    specialty: 'Chassis & Safety Systems',
    initials: 'BL',
  },
]

const STATS = [
  { value: '12+', label: 'Years in Business' },
  { value: '5000+', label: 'Vehicles Serviced' },
  { value: '98%', label: 'Customer Satisfaction' },
  { value: '3', label: 'Certified Mechanics' },
]

export default function About() {
  return (
    <div className="min-h-screen bg-[#f0efe8]">
      {/* Header */}
      <div className="bg-olive-900 py-14 px-6 text-center">
        <h1 className="font-display text-4xl text-white tracking-widest mb-2">ABOUT US</h1>
        <p className="font-body text-olive-200 tracking-wider text-base">
          The team behind Flying Horse Mechanics
        </p>
      </div>

      {/* Story */}
      <section className="max-w-4xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-3xl text-olive-900 tracking-widest mb-4">
              OUR STORY
            </h2>
            <div className="w-12 h-1 bg-olive-600 mb-6" />
            <p className="font-body text-base text-gray-700 leading-relaxed mb-4 tracking-wide">
              Flying Horse Mechanics was founded with one mission: deliver honest, professional
              automotive service at a fair price. We believe every driver deserves expert care
              for their vehicle, without the runaround.
            </p>
            <p className="font-body text-base text-gray-700 leading-relaxed tracking-wide">
              Our team of certified mechanics brings decades of combined experience working
              on all makes and models — from routine maintenance to complex engine repairs.
            </p>
          </div>
          <div
            className="relative h-64 rounded-sm overflow-hidden"
            style={{
              backgroundImage: 'url(/images/mechanic1.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-olive-900/30" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-olive-800 py-12">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-4xl text-white tracking-wide">{stat.value}</p>
              <p className="font-body text-xs tracking-widest uppercase text-olive-200 mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="max-w-4xl mx-auto px-6 py-14">
        <h2 className="font-display text-3xl text-olive-900 tracking-widest mb-2 text-center">
          MEET THE TEAM
        </h2>
        <div className="w-12 h-1 bg-olive-600 mx-auto mb-10" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-sm shadow-sm border border-olive-100 p-6 text-center hover:shadow-md transition-shadow"
            >
              {/* Avatar */}
              <div className="w-16 h-16 rounded-full bg-olive-700 flex items-center justify-center mx-auto mb-4">
                <span className="font-display text-xl text-white tracking-wider">
                  {member.initials}
                </span>
              </div>
              <h3 className="font-display text-lg text-olive-900 tracking-wide">{member.name}</h3>
              <p className="font-body text-xs tracking-widest uppercase text-olive-500 mt-1 mb-3">
                {member.role}
              </p>
              <div className="border-t border-olive-100 pt-3 space-y-1">
                <p className="font-body text-sm text-gray-600">
                  <span className="text-olive-600 font-semibold">Specialty:</span> {member.specialty}
                </p>
                <p className="font-body text-sm text-gray-600">
                  <span className="text-olive-600 font-semibold">Experience:</span> {member.experience}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface py-14 text-center border-t border-olive-200">
        <h2 className="font-display text-2xl text-olive-900 tracking-widest mb-3">
          READY TO TRUST US WITH YOUR VEHICLE?
        </h2>
        <p className="font-body text-olive-600 tracking-wider mb-8 text-base">
          Book your appointment online in minutes.
        </p>
        <Link to="/scheduling" className="btn-primary text-base px-10 py-3">
          Schedule Now
        </Link>
      </section>
    </div>
  )
}
