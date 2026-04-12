import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-olive-900 text-olive-200 py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-display text-lg text-white tracking-wide mb-2">Flying Horse</h3>
          <p className="font-body text-xs tracking-widest uppercase text-olive-400 mb-3">mechanics</p>
          <p className="font-body text-sm text-olive-300 leading-relaxed">
            Best mechanics in the industry.<br />The best care for your vehicle.
          </p>
        </div>
        <div>
          <h4 className="font-display text-sm tracking-widest text-white mb-4 uppercase">Navigation</h4>
          <ul className="space-y-2">
            {[['Home', '/'], ['Services', '/services'], ['Scheduling', '/scheduling'], ['About', '/about']].map(([label, to]) => (
              <li key={to}>
                <Link to={to} className="font-body text-sm text-olive-300 hover:text-white transition-colors tracking-wider">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm tracking-widest text-white mb-4 uppercase">Contact</h4>
          <div className="space-y-2 font-body text-sm text-olive-300">
            <p>📞 <a href="tel:+5585556778345" className="hover:text-white transition-colors">+55 85556778345</a></p>
            <p>✉️ <a href="mailto:Test@example.com" className="hover:text-white transition-colors">Test@example.com</a></p>
            <p>📍 Flying Horse BR</p>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 mt-8 pt-4 border-t border-olive-700">
        <p className="font-body text-xs text-olive-500 tracking-widest text-center">
          © {new Date().getFullYear()} Flying Horse Mechanics. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
