export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="mb-2">🔧 Flying Horse Mechanic - Sua oficina de confiança</p>
        <p className="text-sm">
          © {new Date().getFullYear()} Todos os direitos reservados.
        </p>
        <div className="mt-4 flex justify-center gap-4 text-sm">
          <a href="/privacy" className="hover:text-white">Privacidade</a>
          <a href="/terms" className="hover:text-white">Termos</a>
          <a href="/contact" className="hover:text-white">Contato</a>
        </div>
      </div>
    </footer>
  )
}