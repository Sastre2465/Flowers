// Pantalla de entrada: solo Andrea puede pasar, y no agrega scroll a la página
const gate = document.getElementById('gate');
const gateCard = document.querySelector('.gate-card');
const gateForm = document.getElementById('gateForm');
const gateInput = document.getElementById('gateInput');
const heroEyebrow = document.getElementById('heroEyebrow');
const songEmbed = document.getElementById('songEmbed');

function normalizar(texto) {
  return texto
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

function activarMusica() {
  if (songEmbed && !songEmbed.src) {
    songEmbed.src = songEmbed.dataset.src;
  }
}

function entrarAlJardin() {
  heroEyebrow.textContent = 'hecho con cariño, solo para ti';
  gate.classList.add('is-leaving');
  document.body.classList.remove('no-scroll');
  activarMusica();
}

const yaEntro = localStorage.getItem('jardin-acceso') === 'andrea';
if (yaEntro) {
  entrarAlJardin();
}

gateForm.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const nombre = gateInput.value;

  if (normalizar(nombre) !== 'andrea') {
    gateCard.classList.remove('is-shaking');
    void gateCard.offsetWidth; // reinicia la animación si ya estaba corriendo
    gateCard.classList.add('is-shaking');
    gateInput.focus();
    return;
  }

  localStorage.setItem('jardin-acceso', 'andrea');
  entrarAlJardin();
});

// Pétalos cayendo continuamente en el resto de la página
const petalsLayer = document.getElementById('petalsLayer');

function crearPetalo(contenedor) {
  const petalo = document.createElement('div');
  petalo.className = 'petal';

  const izquierda = Math.random() * 100;
  const duracionCaida = 7 + Math.random() * 6;
  const duracionBalanceo = 2 + Math.random() * 2;
  const tamano = 8 + Math.random() * 10;
  const tonos = ['#F6C445', '#FFE066', '#E8A93B', '#F9D33C'];

  petalo.style.left = izquierda + 'vw';
  petalo.style.width = tamano + 'px';
  petalo.style.height = tamano + 'px';
  petalo.style.background = tonos[Math.floor(Math.random() * tonos.length)];
  petalo.style.animationDuration = `${duracionCaida}s, ${duracionBalanceo}s`;

  contenedor.appendChild(petalo);
  setTimeout(() => petalo.remove(), duracionCaida * 1000 + 200);
}

setInterval(() => crearPetalo(petalsLayer), 450);
for (let i = 0; i < 8; i++) {
  setTimeout(() => crearPetalo(petalsLayer), i * 250);
}

// Luciérnagas flotando en la pantalla de entrada
const gateFireflies = document.getElementById('gateFireflies');

function crearLuciernagas(contenedor, cantidad) {
  for (let i = 0; i < cantidad; i++) {
    const luciernaga = document.createElement('div');
    luciernaga.className = 'firefly';
    luciernaga.style.left = Math.random() * 100 + '%';
    luciernaga.style.top = 15 + Math.random() * 65 + '%';
    luciernaga.style.animationDuration = 3 + Math.random() * 3 + 's';
    luciernaga.style.animationDelay = Math.random() * 4 + 's';
    contenedor.appendChild(luciernaga);
  }
}

crearLuciernagas(gateFireflies, 18);

// Revelado de secciones al hacer scroll
const observador = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('is-visible');
        observador.unobserve(entrada.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach((el) => observador.observe(el));

// Abrir la carta
const botonAbrir = document.getElementById('openLetter');
const carta = document.getElementById('letter');
const chivo = document.getElementById('goatMascot');

botonAbrir.addEventListener('click', () => {
  botonAbrir.classList.add('is-open');
  carta.classList.add('is-open');
  carta.scrollIntoView({ behavior: 'smooth', block: 'center' });

  chivo.classList.remove('is-jumping');
  void chivo.offsetWidth; // reinicia la animación
  chivo.classList.add('is-jumping');
});
