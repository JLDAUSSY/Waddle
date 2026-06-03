const sets = {
  sanary: [1, 2, 3,4,5],
  bandol: [1, 2,3,4,5],
  laciotat: [1, 2,3,4,5],
  cassis: [1,2,3],
  lacadieredazur: [1,2,3,4,5,6],
  lebrusc: [1, 2, 3, 4, 5],
  lecastellet: [1,2,3,4],
  marseille: [1,2,3,4,5],
  saintmandrier: [1, 2, 3, 4,5],
  giens: [1,2,3],      // AJOUT : Configuration pour Giens
  hyeres: [1,2,3,4,5,6,7,8,9]      // AJOUT : Configuration pour Hyères
};


const params = new URLSearchParams(window.location.search);
const set = params.get('set');
const numbers = sets[set] || [];
let index = 0;

// On déclare les variables pour les éléments HTML
let img, caption;

// Au chargement de la page, on récupère les éléments et on affiche la première image
window.addEventListener('DOMContentLoaded', () => {
  img = document.getElementById('img1');
  caption = document.getElementById('caption');
  show();
});

function show() {
  if (numbers.length === 0 || !img) return;
  const num = numbers[index];
  img.src = set + '/' + num + '.jpg';
  caption.innerText = titles[set]?.[num] || '';
}

// Fonctions globales attachées à "window" pour être lues par les boutons HTML
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

// Gestion des flèches droite et gauche du clavier sur PC
document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowRight') window.next();
  if (e.key === 'ArrowLeft') window.prev();
});