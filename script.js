const sets = {
  sanary: [1, 2, 3, 4, 5],
  bandol: [1, 2, 3, 4, 5],
  laciotat: [1, 2, 3, 4, 5],
  cassis: [1, 2, 3],
  lacadieredazur: [1, 2, 3, 4, 5, 6],
  lebrusc: [1, 2, 3, 4, 5],
  lecastellet: [1, 2, 3, 4],
  marseille: [1, 2, 3, 4, 5],
  saintmandrier: [1, 2, 3, 4, 5],
  giens: [1, 2, 3],      
  hyeres: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  ensueslaredonne: [1, 2, 3, 4, 5] // Ajout de Ensuès-la-Redonne
};

const titles = {
  sanary: { 1: "", 2: "", 3: "", 4: "", 5: "" },
  bandol: { 1: "", 2: "", 3: "", 4: "", 5: "" },
  laciotat: { 1: "", 2: "", 3: "", 4: "", 5: "" },
  cassis: { 1: "", 2: "", 3: "" },
  lacadieredazur: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "" },
  lebrusc: { 1: "", 2: "", 3: "", 4: "", 5: "" },
  lecastellet: { 1: "", 2: "", 3: "", 4: "" },
  marseille: { 1: "", 2: "", 3: "", 4: "" , 5: "" },
  saintmandrier: { 1: "", 2: "", 3: "", 4: "", 5: "" },
  giens: { 1: "", 2: "", 3: "" },
  hyeres: { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "" },
  ensueslaredonne: { 1: "", 2: "", 3: "", 4: "", 5: "" } // Ajout de Ensuès-la-Redonne
};

const params = new URLSearchParams(window.location.search);
const set = params.get('set');
const numbers = sets[set] || [];
let index = 0;

let img, caption;

// Variables pour mémoriser la position du doigt sur écran tactile
let touchStartX = 0;
let touchEndX = 0;

window.addEventListener('DOMContentLoaded', () => {
  img = document.getElementById('img1');
  caption = document.getElementById('caption');
  show();

  // ÉCOUTEURS TACTILES (Pour glisser le doigt sur smartphone)
  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });
});

function show() {
  if (numbers.length === 0 || !img) return;
  const num = numbers[index];
  img.src = './' + set + '/' + num + '.jpg';
  caption.innerText = titles[set]?.[num] || '';
}

// Fonction pour analyser le mouvement du doigt
function handleSwipe() {
  const seuil = 50; // Distance minimale en pixels pour valider le mouvement
  if (touchStartX - touchEndX > seuil) {
    window.next(); // Glissé vers la gauche -> Photo suivante
  } else if (touchEndX - touchStartX > seuil) {
    window.prev(); // Glissé vers la droite -> Photo précédente
  }
}

// Fonctions globales de navigation
window.next = function() {
  if (numbers.length === 0) return;
  index++;
  if (index >= numbers.length) index = 0;
  show();
};

window.prev = function() {
  if (numbers.length === 0) return;
  index--;
  if (index < 0) index = numbers.length - 1;
  show();
};

// Gestion des flèches du clavier physiques (PC/Mac)
document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowRight') window.next();
  if (e.key === 'ArrowLeft') window.prev();
});