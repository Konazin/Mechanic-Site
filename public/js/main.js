const toggle = document.getElementById('menu-toggle');
const nav = document.getElementById('main-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.style.display === 'flex';
    nav.style.display = isOpen ? 'none' : 'flex';
  });
}

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
    if (window.innerWidth <= 768 && nav) nav.style.display = 'none';
  });
});

const form = document.getElementById('form-contato');
if (form) {
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const nome = form.nome.value.trim();
    const email = form.email.value.trim();
    const mensagem = form.mensagem.value.trim();
    const msg = document.getElementById('form-msg');
    if (!nome || !email || !mensagem) {
      if (msg) msg.textContent = 'Preencha todos os campos.';
      return;
    }
    if (msg) msg.textContent = 'Enviando...';

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, mensagem })
      });
      if (!response.ok) throw new Error('Falha');
      if (msg) msg.textContent = 'Mensagem enviada com sucesso!';
      form.reset();
    } catch (error) {
      if (msg) msg.textContent = 'Erro ao enviar. Tente novamente.';
    }
  });
}
