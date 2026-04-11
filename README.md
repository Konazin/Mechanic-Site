# Mecânica Portfólio (Front-end)

Estrutura de front-end para site de mecânica/auto-centro.

## Pastas criadas
- `public/assets/css/` - estilos
- `public/assets/js/` - JavaScript interativo
- `public/assets/images/` - imagens de exemplo
- `src/pages/` - páginas HTML
- `src/components/` - (atualmente não usado, reservado para componentes)

## Como rodar localmente
1. Assim que o backend Express estiver rodando (`npm start`), a pasta `public` deve ser servida como estática.
2. Acesse `http://localhost:3000/` ou rota configurada.
3. Para testar sem backend: `npx serve src/pages` ou qualquer servidor estático.

## Endpoints recomendados no backend
- `POST /api/contact` (formulário de contato)
- `GET /api/servicos` (lista de serviços)
- `GET /api/depoimentos` (lista de depoimentos)
