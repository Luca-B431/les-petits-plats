import data from '../data/recipes.json';
import { getTemplate } from '/src/scripts/template';

// Pour chaque recette, on crée une carte HTML et on l'ajoute au conteneur.
data.forEach((recipe) => {
  const container = document.getElementById('grid-container');

  const template = getTemplate(recipe);
  container.appendChild(template);
});
