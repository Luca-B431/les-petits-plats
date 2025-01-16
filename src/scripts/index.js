import data from '../data/recipes.json';
import { getTemplate } from '/src/scripts/template';

// Pour chaque recette, on crée une carte HTML et on l'ajoute au conteneur.
data.forEach((recipe) => {
  const container = document.getElementById('grid-container');

  const template = getTemplate(recipe);
  container.appendChild(template);
});

function filterButton() {
  const buttons = document.querySelectorAll('.filter-button');
  const ingredientsMenu = document.querySelector('.ingredients-content');
  const appareilsMenu = document.querySelector('.appareils-content');
  const ustensilesMenu = document.querySelector('.ustensiles-content');

  buttons.forEach((button) => {
    // Rotation du vecteur lors du clique sur le bouton
    let vector = button.querySelector('svg');
    function toggleVector() {
      if (vector.getAttribute('style') === 'transform: rotate(180deg);') {
        vector.removeAttribute('style');
      } else {
        vector.setAttribute('style', 'transform: rotate(180deg);');
      }
    }

    // Ecoute du clique sur le bouton pour afficher le menu correspondant
    button.addEventListener('click', (e) => {
      if (button.id === 'ingredients') {
        ingredientsMenu.classList.toggle('show');
        toggleVector();
      } else if (
        !e.target.matches('.filter-button') &&
        !e.target.matches('#ingredients-search')
      ) {
        ingredientsMenu.classList.remove('show');
      }

      if (button.id === 'appareils') {
        appareilsMenu.classList.toggle('show');
        toggleVector();
      } else if (
        !e.target.matches('.filter-button') &&
        !e.target.matches('#appareils-search')
      ) {
        appareilsMenu.classList.remove('show');
      }

      if (button.id === 'ustensiles') {
        ustensilesMenu.classList.toggle('show');
        toggleVector();
      } else if (
        !e.target.matches('.filter-button') &&
        !e.target.matches('#ustensiles-search')
      ) {
        ustensilesMenu.classList.remove('show');
      }

      window.addEventListener('click', (e) => {
        if (
          !e.target.matches('.filter-button') &&
          !e.target.matches('#button-container input')
        ) {
          ingredientsMenu.classList.remove('show');
          appareilsMenu.classList.remove('show');
          ustensilesMenu.classList.remove('show');
          vector.setAttribute('style', 'transform: rotate(180deg);');
        }
      });
    });
  });
}

filterButton();
