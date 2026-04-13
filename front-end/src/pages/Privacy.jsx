// front-end/src/pages/Privacy.jsx
import { Link } from 'react-router-dom'

export default function Privacy() {
  const dataTypes = [
    {
      category: 'Dados de Conta',
      items: ['Nome', 'E-mail', 'Senha (criptografada)', 'Telefone (opcional)'],
      purpose: 'Autenticação e identificação do usuário'
    },
    {
      category: 'Dados de Agendamento',
      items: ['Data e horário', 'Veículo', 'Descrição do serviço', 'Status'],
      purpose: 'Gerenciamento de serviços da oficina'
    },
    {
      category: 'Dados Técnicos',
      items: ['IP', 'User-Agent', 'Logs de acesso'],
      purpose: 'Segurança, debugging e melhoria do sistema'
    }
  ]

  const securityMeasures = [
    '🔐 Senhas armazenadas com bcrypt (hash seguro)',
    '🔑 Autenticação via JWT com expiração',
    '🛡️ Proteção contra SQL injection (Sequelize ORM)',
    '🌐 HTTPS recomendado em produção',
    '📦 Dados locais em SQLite (dev) ou PostgreSQL criptografado (prod)'
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gray-900 px-6 py-8 text-center">
          <h1 className="text-3xl font-bold text-white">🔒 Política de Privacidade</h1>
          <p className="mt-2 text-gray-300">Como protegemos seus dados no Mechanic-Site</p>
        </div>

        {/* Conteúdo */}
        <div className="px-6 py-8 prose prose-blue max-w-none">
          <p className="text-gray-600">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1. Coleta de Dados</h2>
          <p className="text-gray-700">
            Coletamos apenas os dados necessários para o funcionamento do sistema de agendamento:
          </p>
          
          <div className="space-y-4 mt-4">
            {dataTypes.map((data, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg border">
                <h4 className="font-medium text-gray-900">{data.category}</h4>
                <ul className="list-disc pl-6 text-gray-700 mt-1">
                  {data.items.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Finalidade:</strong> {data.purpose}
                </p>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2. Como Usamos Seus Dados</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Autenticar seu acesso ao sistema</li>
            <li>Gerenciar seus agendamentos de serviços</li>
            <li>Enviar confirmações e lembretes (em produção)</li>
            <li>Melhorar a experiência com base em uso anônimo</li>
            <li>Cumprir obrigações legais, se aplicável</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3. Medidas de Segurança</h2>
          <p className="text-gray-700">
            Implementamos práticas para proteger suas informações:
          </p>
          <ul className="space-y-2 mt-3">
            {securityMeasures.map((measure, index) => (
              <li key={index} className="flex items-start text-gray-700">
                <span className="mr-2">{measure.split(' ')[0]}</span>
                <span>{measure.split(' ').slice(1).join(' ')}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4. Compartilhamento de Dados</h2>
          <p className="text-gray-700">
            <strong>Não vendemos nem compartilhamos</strong> seus dados pessoais com terceiros. 
            Os dados permanecem no banco de dados da aplicação e só são acessados:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-1 mt-2">
            <li>Pelo próprio usuário (via autenticação)</li>
            <li>Pela oficina, para gestão dos agendamentos</li>
            <li>Por exigência legal, mediante ordem judicial</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5. Seus Direitos</h2>
          <p className="text-gray-700">
            Como usuário, você pode:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-1 mt-2">
            <li>Acessar e visualizar seus dados a qualquer momento</li>
            <li>Solicitar correção de informações incorretas</li>
            <li>Excluir sua conta e dados associados</li>
            <li>Exportar seus dados em formato legível</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">6. Cookies e Rastreamento</h2>
          <p className="text-gray-700">
            Este projeto open source <strong>não utiliza cookies de rastreamento</strong> ou analytics de terceiros. 
            O localStorage é usado apenas para:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-1 mt-2">
            <li>Manter sua sessão autenticada (token JWT)</li>
            <li>Armazenar preferências locais de exibição</li>
          </ul>

          <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              ✅ <strong>Transparência:</strong> Este é um projeto open source. 
              Todo o código que lida com dados está disponível publicamente para auditoria no{' '}
              <a 
                href="https://github.com/Konazin/Mechanic-Site" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-green-700"
              >
                GitHub
              </a>.
            </p>
          </div>

          <div className="mt-6 p-4 bg-gray-50 border rounded-lg">
            <p className="text-sm text-gray-700">
              📧 <strong>Contato para Privacidade:</strong> Dúvidas sobre esta política? 
              Use a página de <Link to="/contact" className="text-blue-600 hover:underline">Contato</Link> ou abra uma issue no repositório.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t text-center">
          <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
            ← Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  )
}