// front-end/src/pages/Terms.jsx
import { Link } from 'react-router-dom'

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gray-900 px-6 py-8 text-center">
          <h1 className="text-3xl font-bold text-white">🔧 Termos de Uso</h1>
          <p className="mt-2 text-gray-300">Mechanic-Site — Projeto Open Source</p>
        </div>

        {/* Conteúdo */}
        <div className="px-6 py-8 prose prose-blue max-w-none">
          <p className="text-gray-600">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1. Aceitação dos Termos</h2>
          <p className="text-gray-700">
            Ao acessar e utilizar o <strong>Mechanic-Site</strong>, você concorda com estes Termos de Uso. 
            Se não concordar, por favor, não utilize este software.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2. Licença Open Source</h2>
          <p className="text-gray-700">
            Este projeto é distribuído sob a licença <strong>MIT</strong>. Isso significa que você pode:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-1 mt-2">
            <li>Usar, copiar, modificar e distribuir o código</li>
            <li>Utilizar em projetos pessoais ou comerciais</li>
            <li>Contribuir com melhorias via pull requests</li>
          </ul>
          <p className="text-gray-700 mt-3">
            O software é fornecido "como está", sem garantias de qualquer tipo. 
            Os autores não se responsabilizam por danos decorrentes do uso.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3. Uso Responsável</h2>
          <p className="text-gray-700">
            Ao utilizar este sistema para agendamento de serviços mecânicos, você se compromete a:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-1 mt-2">
            <li>Fornecer informações verdadeiras e atualizadas</li>
            <li>Não utilizar o sistema para fins maliciosos ou ilegais</li>
            <li>Respeitar os horários agendados e políticas da oficina</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4. Propriedade Intelectual</h2>
          <p className="text-gray-700">
            O código-fonte está disponível publicamente no GitHub. 
            Marcas, logos e conteúdos específicos da oficina permanecem propriedade de seus respectivos donos.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5. Modificações</h2>
          <p className="text-gray-700">
            Estes termos podem ser atualizados a qualquer momento. 
            Alterações significativas serão comunicadas via repositório GitHub.
          </p>

          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              💡 <strong>Dica:</strong> Este é um projeto de código aberto. 
              Encontre bugs ou tenha sugestões?{' '}
              <a 
                href="https://github.com/Konazin/Mechanic-Site" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-blue-600"
              >
                Contribua no GitHub
              </a>!
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