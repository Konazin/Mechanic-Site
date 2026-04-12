import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { authLogin } from '../api/services'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm]       = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // ── TROCAR pelo real quando o backend estiver pronto: ──
      // const { data } = await authLogin(form)
      // localStorage.setItem('fh_token', data.token)
      // navigate('/')

      // Mock login
      await new Promise((r) => setTimeout(r, 800))
      if (form.email === 'demo@flyinghorse.com' && form.password === 'demo123') {
        localStorage.setItem('fh_token', 'mock_jwt_token_here')
        navigate('/')
      } else {
        setError('Invalid credentials. Try demo@flyinghorse.com / demo123')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f0efe8] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-sm shadow border border-olive-100 overflow-hidden">
          {/* Top accent */}
          <div className="h-1 bg-olive-700" />

          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="font-display text-3xl text-olive-900 tracking-widest">
                FLYING HORSE
              </h1>
              <p className="font-body text-xs tracking-[0.25em] uppercase text-olive-400 mt-1">
                mechanics
              </p>
            </div>

            <h2 className="font-display text-lg text-olive-800 tracking-widest mb-6 text-center">
              SIGN IN
            </h2>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 font-body text-sm rounded px-4 py-3 mb-4 tracking-wide">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-body text-xs tracking-widest uppercase text-olive-500 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full font-body text-sm text-olive-900 bg-olive-50 border border-olive-200
                             rounded px-3 py-2.5 focus:outline-none focus:border-olive-500 transition-colors"
                />
              </div>
              <div>
                <label className="block font-body text-xs tracking-widest uppercase text-olive-500 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full font-body text-sm text-olive-900 bg-olive-50 border border-olive-200
                             rounded px-3 py-2.5 focus:outline-none focus:border-olive-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full btn-primary py-3 text-sm tracking-widest mt-2
                  ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <p className="font-body text-sm text-center text-olive-500 mt-6 tracking-wider">
              No account yet?{' '}
              <Link to="/register" className="text-olive-700 hover:text-olive-500 font-semibold transition-colors">
                Register
              </Link>
            </p>
          </div>
        </div>

        {/* Demo hint */}
        <p className="text-center font-body text-xs text-olive-400 tracking-wider mt-4">
          Demo: demo@flyinghorse.com / demo123
        </p>
      </div>
    </div>
  )
}
