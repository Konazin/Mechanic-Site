import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      {/* ── HERO ── */}
      <section
        className="relative flex items-center"
        style={{
          minHeight: '320px',
          backgroundImage: 'url(/images/hero_bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

        <div className="relative z-10 px-12 py-16">
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white leading-tight drop-shadow-lg tracking-wide">
            Best mechanics<br />
            <span className="text-olive-200">in the best place</span>
          </h1>
          <div className="mt-6 flex gap-4">
            <Link to="/scheduling" className="btn-primary text-base px-8 py-3">
              Book Now
            </Link>
            <Link
              to="/services"
              className="font-body font-semibold tracking-widest text-base text-white border-2 border-white/60 px-8 py-3 rounded hover:bg-white/10 transition-colors"
            >
              Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* ── MECHANICS SECTION ── */}
      <section className="bg-surface relative overflow-hidden">
        {/* subtle texture */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)', backgroundSize: '8px 8px' }}
        />
        <div className="relative flex flex-col md:flex-row min-h-64">
          {/* Card */}
          <div className="md:w-1/2 section-card">
            <h2>MECHANICS</h2>
            <p>
              Best mechanics in the industry<br />
              The best care for your service
            </p>
            <Link to="/about" className="mt-6 inline-block btn-primary text-sm w-fit">
              Meet the team →
            </Link>
          </div>
          {/* Image */}
          <div className="md:w-1/2">
            <img
              src="/images/mechanic1.png"
              alt="Mechanic working on engine"
              className="w-full h-full object-cover"
              style={{ minHeight: '260px' }}
            />
          </div>
        </div>
      </section>

      {/* ── SERVICES SECTION ── */}
      <section className="bg-[#ccccc0] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)', backgroundSize: '8px 8px' }}
        />
        <div className="relative flex flex-col md:flex-row min-h-64">
          {/* Image */}
          <div className="md:w-5/12">
            <img
              src="/images/mechanic2.png"
              alt="Mechanic cleaning tools"
              className="w-full h-full object-cover"
              style={{ minHeight: '280px' }}
            />
          </div>
          {/* Card */}
          <div className="md:w-7/12 section-card">
            <h2>SERVICES</h2>
            <p>
              The best customer service<br />
              The best service plans
            </p>
            <Link to="/services" className="mt-6 inline-block btn-primary text-sm w-fit">
              View all services →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA SCHEDULING ── */}
      <section className="bg-olive-900 py-16 text-center">
        <h2 className="font-display text-3xl text-white tracking-widest mb-3">
          READY TO SCHEDULE?
        </h2>
        <p className="font-body text-olive-200 tracking-wider mb-8 text-base">
          Book your appointment online — fast and easy.
        </p>
        <Link to="/scheduling" className="btn-primary text-base px-10 py-3">
          Schedule Now
        </Link>
      </section>
    </div>
  )
}
