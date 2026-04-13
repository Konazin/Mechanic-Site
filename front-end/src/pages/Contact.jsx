// front-end/src/pages/Contact.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState({ type: '', text: '' })
  const [loading, setLoading] = useState(false)

  // 🔑 TROQUE ESTE E-MAIL PELO SEU REAL:
  const CONTACT_EMAIL = 'm4caun4@gmail.com'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ type: '', text: '' })
    setLoading(true)

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          _subject: formData.subject || 'Nova mensagem via Mechanic-Site',
          _next: window.location.href, // Redireciona de volta para a página após enviar
          _captcha: 'false' // Desativa captcha (opcional)
        })
      })

      if (!response.ok) throw new Error('Falha no envio')

      setStatus({ type: 'success', text: '✅ Mensagem enviada! Responderei em breve.' })
      setFormData({ name: '', email: '', subject: '', message: '' })
      
    } catch (error) {
      console.error('Erro:', error)
      setStatus({ type: 'error', text: '❌ Erro ao enviar. Tente novamente ou me contate pelo GitHub.' })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const socialLinks = [
    { 
      name: 'GitHub', 
      url: 'https://github.com/Konazin/Mechanic-Site',
      icon: '🐙',
      desc: 'Código-fonte, issues e contribuições'
    },
    { 
      name: 'Perfil do Desenvolvedor', 
      url: 'https://github.com/Konazin',
      icon: '👨‍💻',
      desc: 'Outros projetos e portfólio'
    },
    { 
      name: 'Perfil do Designer', 
      url: 'https://github.com/WellXD13',
      icon: '👨‍💻',
      desc: 'Outros projetos e portfólio'
    },
    { 
      name: 'Documentação', 
      url: 'https://github.com/Konazin/Mechanic-Site#readme',
      icon: '📚',
      desc: 'Guia de instalação e uso'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">📬 Contato</h1>
          <p className="mt-2 text-gray-600">
            Dúvidas, sugestões ou quer contribuir? Entre em contato!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulário */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Envie uma Mensagem</h2>
            
            {status.text && (
              <div className={`p-4 rounded mb-4 ${
                status.type === 'success' 
                  ? 'bg-green-100 text-green-800 border border-green-400' 
                  : 'bg-red-100 text-red-800 border border-red-400'
              }`}>
                {status.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nome *</label>
                <input
                  type="text"
                  name="name"
                  required
                  disabled={loading}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">E-mail *</label>
                <input
                  type="email"
                  name="email"
                  required
                  disabled={loading}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Assunto</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="Sugestão, bug, dúvida..."
                  disabled={loading}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Mensagem *</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  disabled={loading}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="animate-spin">⏳</span> Enviando...
                  </>
                ) : (
                  'Enviar Mensagem'
                )}
              </button>
            </form>

            <p className="mt-4 text-xs text-gray-500 text-center">
              🔒 Formulário seguro via FormSubmit. Seus dados não são armazenados.
            </p>
          </div>

          {/* Links e Informações */}
          <div className="space-y-6">
            {/* Links do GitHub */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">🔗 Links Úteis</h2>
              <div className="space-y-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition group"
                  >
                    <span className="text-2xl mr-3">{link.icon}</span>
                    <div>
                      <p className="font-medium text-gray-900 group-hover:text-blue-700">
                        {link.name}
                      </p>
                      <p className="text-sm text-gray-600">{link.desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Informações do Projeto */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">ℹ️ Sobre o Projeto</h2>
              <dl className="space-y-3 text-gray-700">
                <div>
                  <dt className="font-medium text-gray-900">Licença</dt>
                  <dd>MIT License — Use e modifique livremente</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">Tecnologias</dt>
                  <dd>React, Vite, Node.js, Express, Sequelize, SQLite/PostgreSQL</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">Status</dt>
                  <dd>🚀 Em desenvolvimento ativo</dd>
                </div>
              </dl>
            </div>

            {/* Dica de Contribuição */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="font-semibold text-blue-900 mb-2">🤝 Quer Contribuir?</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Reporte bugs via <strong>Issues</strong> no GitHub</li>
                <li>• Sugira melhorias ou novas funcionalidades</li>
                <li>• Envie pull requests com correções</li>
                <li>• Ajude a melhorar a documentação</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center">
          <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
            ← Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  )
}