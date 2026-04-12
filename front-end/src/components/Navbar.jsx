import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const token = localStorage.getItem('fh_token')

  const handleLogout = () => {
    localStorage.removeItem('fh_token')
    navigate('/login')
  }

  const navItems = [
    { label: 'Home',        to: '/' },
    { label: 'Services',    to: '/services' },
    { label: 'Scheduling',  to: '/scheduling' },
    { label: 'About',       to: '/about' },
  ]

  return (
    <header>
      {/* ── TOP BAR ── */}
      <div className="bg-olive-800 text-olive-200 text-xs tracking-wider px-6 py-1.5 flex gap-6 flex-wrap">
        <span className="font-semibold text-white">Flying Horse BR</span>
        <a href="tel:+5585556778345" className="hover:text-white transition-colors">
          +55 85556778345
        </a>
        <a href="mailto:Test@example.com" className="hover:text-white transition-colors">
          Test@example.com
        </a>
      </div>

      {/* ── MAIN NAV ── */}
      <nav className="bg-olive-900 px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="leading-tight group">
            <span className="block font-display text-xl text-white tracking-wide">
              Flying Horse
            </span>
            <span className="block font-body text-[0.7rem] tracking-[0.22em] uppercase text-olive-200 group-hover:text-white transition-colors">
              mechanics
            </span>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `px-4 py-2 font-body font-medium tracking-widest text-sm transition-colors
                     ${isActive
                       ? 'text-white border-b-2 border-olive-200'
                       : 'text-olive-200 hover:text-white'
                     }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Auth Button */}
          <div className="hidden md:block">
            {token ? (
              <button onClick={handleLogout} className="btn-primary text-sm">
                Logout
              </button>
            ) : (
              <Link to="/login" className="btn-primary text-sm flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 1a6 6 0 0 0-6 6h12a6 6 0 0 0-6-6z"/>
                </svg>
                Login
              </Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-olive-200 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-3 pb-3 border-t border-olive-700 pt-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2 font-body tracking-wider text-sm transition-colors
                   ${isActive ? 'text-white' : 'text-olive-200 hover:text-white'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="px-4 mt-3">
              {token ? (
                <button onClick={handleLogout} className="btn-primary w-full text-sm">Logout</button>
              ) : (
                <Link to="/login" onClick={() => setMenuOpen(false)} className="btn-primary block text-center text-sm">
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
