import { getTemplate } from '/src/scripts/template';

const ingredientsMenu = document.querySelector('.ingredients-content');
const appareilsMenu = document.querySelector('.appareils-content');
const ustensilsMenu = document.querySelector('.ustensils-content');
const ingredientsSearch = document.getElementById('ingredients-search');
const appareilsSearch = document.getElementById('appareils-search');
const ustensilsSearch = document.getElementById('ustensils-search');

// Règle si aucune reccherche n'est effectué, afichage d'un message invitant l'utilisateur à effectuer une recherche
export const emptySearch = () => {
  const recipeContainer = document.getElementById('grid-container');
  recipeContainer.innerHTML = '';
  recipeContainer.classList.add(
    'flex',
    'justify-center',
    'items-center',
    'h-96',
    'w-full',
    'bg-[#eeeeee]'
  );
  recipeContainer.innerHTML = `<h2 class="text-3xl">Aucune recette ne correspond à votre critère… vous pouvez chercher « lait », « beurre », etc.</h2>`;
};
// Formate le JSON pour que toutes les valeurs ai une majuscule à la première lettre
export function formatData(data) {
  return data.map((recipe) => ({
    ...recipe,
    ingredients: recipe.ingredients.map((ing) => ({
      ...ing,
      ingredient: ing.ingredient
        .split(' ')
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(' '),
    })),
    ustensils: recipe.ustensils.map((ust) =>
      ust
        .split(' ')
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(' ')
    ),
  }));
}

// Gestion du bouton de recherche
export function submitButton() {
  const submitButton = document.getElementById('search-button');
  submitButton.addEventListener('click', (e) => {
    e.preventDefault();
  });
}

// Gestion de la barre de recherche
export function displayRecipes(data) {
  // Pour chaque recette, on crée une carte HTML et on l'ajoute au conteneur.
  data.forEach((recipe) => {
    const container = document.getElementById('grid-container');

    const template = getTemplate(recipe);
    container.appendChild(template);
  });
}

export function filterInputSearch(list) {
  // Résultat de recherche dans l'input INGREDIENTS
  ingredientsSearch.addEventListener('input', () => {
    let ingredientUserSearch = ingredientsSearch.value.toLowerCase();
    list.childNodes.forEach((li) => {
      let ingredient = li.textContent.toLowerCase();
      if (ingredient.includes(ingredientUserSearch)) {
        li.classList.remove('invisible');
      } else {
        li.classList.add('invisible');
      }
    });
  });

  // Résultat de recherche dans l'input APPAREILS
  appareilsSearch.addEventListener('input', () => {
    let appareilsUserSearch = appareilsSearch.value.toLowerCase();
    list.childNodes.forEach((li) => {
      let ingredient = li.textContent.toLowerCase();
      if (ingredient.includes(appareilsUserSearch)) {
        li.classList.remove('invisible');
      } else {
        li.classList.add('invisible');
      }
    });
  });

  // Résultat de recherche dans l'input USTENSILES
  ustensilsSearch.addEventListener('input', () => {
    let ustensilsUserSearch = ustensilsSearch.value.toLowerCase();
    list.childNodes.forEach((li) => {
      let ingredient = li.textContent.toLowerCase();
      if (ingredient.includes(ustensilsUserSearch)) {
        li.classList.remove('invisible');
      } else {
        li.classList.add('invisible');
      }
    });
  });
}

// Création des listes et des éléments de la liste
export function addFilterList(data, filter) {
  const ingredientsBlock = document.getElementById('ingredients-dropdown');
  const existing = document.getElementById('ingredients-list');
  if (existing) {
    ingredientsBlock.removeChild(existing);
  }
  const listIngredients = document.createElement('ul');
  listIngredients.setAttribute('id', 'ingredients-list');
  listIngredients.classList.add('bg-white', 'px-4', 'px-2', 'w-full');
  const appareilsBlock = document.getElementById('appareils-dropdown');
  const existingAppareils = document.getElementById('appareils-list');
  if (existingAppareils) {
    appareilsBlock.removeChild(existingAppareils);
  }
  const listAppareils = document.createElement('ul');
  listAppareils.setAttribute('id', 'appareils-list');
  listAppareils.classList.add('bg-white', 'px-4', 'px-2', 'w-full');
  const ustensilsBlock = document.getElementById('ustensils-dropdown');
  const existingUstensils = document.getElementById('ustensils-list');
  if (existingUstensils) {
    ustensilsBlock.removeChild(existingUstensils);
  }
  const listUstensils = document.createElement('ul');
  listUstensils.setAttribute('id', 'ustensils-list');
  listAppareils.classList.add('bg-white', 'px-4', 'px-2', 'w-full');
  let arrayIngredients = new Set();
  let arrayAppareils = new Set();
  let arrayUstensils = new Set();

  data.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      arrayIngredients.add(ingredient.ingredient);
    });
  });

  data.forEach((recipe) => {
    arrayAppareils.add(recipe.appliance);
  });

  data.forEach((recipe) => {
    recipe.ustensils.forEach((ustensile) => {
      arrayUstensils.add(ustensile);
    });
  });

  // Trie par ordre alphabétique et gestion des accents pour bien les placer dans la liste
  let sortedIngredients = [...arrayIngredients].sort((a, b) =>
    a.localeCompare(b, 'fr', { sensitivity: 'base' })
  );
  let sortedAppareils = [...arrayAppareils].sort((a, b) =>
    a.localeCompare(b, 'fr', { sensitivity: 'base' })
  );
  let sortedUstensils = [...arrayUstensils].sort((a, b) =>
    a.localeCompare(b, 'fr', { sensitivity: 'base' })
  );

  sortedIngredients.forEach((ingredient) => {
    let li = document.createElement('li');
    li.textContent = ingredient;
    li.classList.add('hover:bg-yellow', 'pb-2', 'li');
    li.addEventListener('click', () => {
      displaySelectedFilters(data, li, filter);
    });
    listIngredients.appendChild(li);
  });

  sortedAppareils.forEach((appliance) => {
    let li = document.createElement('li');
    li.textContent = appliance;
    li.classList.add('hover:bg-yellow', 'pb-2');
    li.addEventListener('click', () => {
      displaySelectedFilters(data, li, filter);
    });
    listAppareils.appendChild(li);
  });

  sortedUstensils.forEach((ustensile) => {
    let li = document.createElement('li');
    li.textContent = ustensile;
    li.classList.add('hover:bg-yellow', 'pb-2');
    li.addEventListener('click', () => {
      displaySelectedFilters(data, li, filter);
    });
    listUstensils.appendChild(li);
  });

  ingredientsBlock.appendChild(listIngredients);
  appareilsBlock.appendChild(listAppareils);
  ustensilsBlock.appendChild(listUstensils);
  filterInputSearch(listIngredients);
  filterInputSearch(listAppareils);
  filterInputSearch(listUstensils);

  return { listIngredients, listAppareils, listUstensils };
}

// Gestion des boutons de filtres
export function filtersButtons() {
  const buttons = document.querySelectorAll('.filter-button');

  buttons.forEach((button) => {
    // Rotation du vecteur lors du clique sur le bouton
    let vector = button.querySelector('svg');
    function toggleVector() {
      vector.classList.toggle('rotate-180');
    }

    // Ecoute du clique sur le bouton pour afficher le menu correspondant
    button.addEventListener('click', (e) => {
      if (button.id === 'ingredients') {
        toggleVector();
        const isOpen = ingredientsMenu.getAttribute('data-open');
        ingredientsMenu.setAttribute(
          'data-open',
          isOpen === 'true' ? 'false' : 'true'
        );
      } else if (
        !e.target.matches('.filter-button') &&
        !e.target.matches('#ingredients-search')
      ) {
        // list.listIngredients.classList.remove('show');
      }

      if (button.id === 'appareils') {
        toggleVector();
        const isOpen = appareilsMenu.getAttribute('data-open');
        appareilsMenu.setAttribute(
          'data-open',
          isOpen === 'true' ? 'false' : 'true'
        );
      } else if (
        !e.target.matches('.filter-button') &&
        !e.target.matches('#appareils-search')
      ) {
        // appareilsMenu.classList.remove('show');
      }

      if (button.id === 'ustensils') {
        toggleVector();
        const isOpen = ustensilsMenu.getAttribute('data-open');
        ustensilsMenu.setAttribute(
          'data-open',
          isOpen === 'true' ? 'false' : 'true'
        );
      } else if (
        !e.target.matches('.filter-button') &&
        !e.target.matches('#ustensils-search')
      ) {
        // ustensilesMenu.classList.remove('show');
      }
    });
  });
  window.addEventListener('click', (e) => {
    if (
      !e.target.matches('.filter-button') &&
      !e.target.matches('#button-container input')
    ) {
      // Cache les listes
      ingredientsMenu.setAttribute('data-open', 'false');
      appareilsMenu.setAttribute('data-open', 'false');
      ustensilsMenu.setAttribute('data-open', 'false');

      // Le vecteur flèche se replace
      let vectors = document.querySelectorAll('.chevron-down');
      vectors.forEach((vector) => {
        vector.classList.add('rotate-180');
      });
    }
  });
}

// Gestion des filtres
export function displaySelectedFilters(data, filterTarget, filter) {
  const selectedFiltersDiv = document.getElementById('selected-filters');
  selectedFiltersDiv.classList.add(
    'grid',
    'row-auto',
    'grid-cols-6',
    'w-full',
    'max-w-screen-2xl',
    'items-center',
    'gap-4',
    'px-24',
    'pb-12',
    'pt-5'
  );

  const selectedFilter = document.createElement('div');
  selectedFilter.classList.add(
    'px-4',
    'py-2',
    'flex',
    'bg-yellow',
    'justify-between',
    'items-center',
    'rounded-lg',
    'shadow-lg'
  );

  const filterName = document.createElement('span');
  filterName.classList.add('text-sm', 'truncate');
  filterName.textContent = filterTarget.textContent;

  // Création du conteneur pour le bouton de fermeture
  const filterCloseButton = document.createElement('button');
  filterCloseButton.setAttribute('id', 'filter-close-cross');
  filterCloseButton.classList.add('ml-2', 'p-1', 'focus:outline-none');

  // Création de l'élément SVG
  const svgNS = 'http://www.w3.org/2000/svg';
  const svgElement = document.createElementNS(svgNS, 'svg');
  svgElement.setAttribute('width', '14');
  svgElement.setAttribute('height', '13');
  svgElement.setAttribute('viewBox', '0 0 14 13');
  svgElement.setAttribute('fill', 'none');

  // Création de l'élément <path> à l'intérieur du SVG
  const pathElement = document.createElementNS(svgNS, 'path');
  pathElement.setAttribute(
    'd',
    'M12 11.5L7 6.5M7 6.5L2 1.5M7 6.5L12 1.5M7 6.5L2 11.5'
  );
  pathElement.setAttribute('stroke', '#1B1B1B');
  pathElement.setAttribute('stroke-width', '2.16667');
  pathElement.setAttribute('stroke-linecap', 'round');
  pathElement.setAttribute('stroke-linejoin', 'round');

  // Assemblage du SVG
  svgElement.appendChild(pathElement);
  filterCloseButton.appendChild(svgElement);

  // Ajout d'un écouteur d'événement pour supprimer le filtre lors du clic sur le bouton de fermeture
  filterCloseButton.addEventListener('click', () => {
    selectedFiltersDiv.removeChild(selectedFilter);
    if (!selectedFiltersDiv.querySelector('div')) {
      selectedFiltersDiv.className = '';
      filtersButtons(addFilterList(data, filter));
    }
  });

  // Assemblage des éléments
  selectedFilter.appendChild(filterName);
  selectedFilter.appendChild(filterCloseButton);
  selectedFiltersDiv.appendChild(selectedFilter);
}
