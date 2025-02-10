import { getTemplate } from '/src/scripts/template';

// Règle si aucune reccherche n'est effectué, afichage d'un message invitant l'utilisateur à effectuer une recherche
export const emptySearch = () => {
  const recipeContainer = document.getElementById('grid-container');
  recipeContainer.innerHTML = '';
  recipeContainer.className =
    'flex justify-center items-center h-96 w-full bg-[#eeeeee] pb-8 text-2xl';

  recipeContainer.innerHTML = `<h2 class="text-[#a7a7a7] text-3xl">Aucune recette ne correspond à vos critères.<br> Recherchez « lait », « beurre », « farine », etc ...</h2>`;
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

// Supprime les click listeners
export function handleClick(event) {
  event.target.removeEventListener('click', handleClick);
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
    container.classList.add(
      'mx-auto',
      'grid',
      'w-full',
      'h-full',
      'max-w-screen-2xl',
      'grid-cols-3',
      'place-items-center',
      'justify-center',
      'gap-12',
      'bg-[#eeeeee]',
      'px-24',
      'pb-8'
    );

    const template = getTemplate(recipe);
    container.appendChild(template);
  });
}

export function filterInputSearch(list) {
  const ingredientsSearch = document.getElementById('ingredients-search');
  const appareilsSearch = document.getElementById('appareils-search');
  const ustensilsSearch = document.getElementById('ustensils-search');

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
export function addFilterList(data) {
  // Vérification de l'existence de la liste d'ingrédients, d'appareils et d'ustensiles

  // PARTIE INGREDIENTS
  const ingredientsBlock = document.getElementById('ingredients-dropdown');
  const listIngredients = document.getElementById('ingredients-list');

  // PARTIE APPAREILS
  const appareilsBlock = document.getElementById('appareils-dropdown');
  const listAppliances = document.getElementById('appliances-list');

  // PARTIE USTENSILES
  const ustensilsBlock = document.getElementById('ustensils-dropdown');
  const listUstensils = document.getElementById('ustensils-list');

  // Créations des objets uniques,
  //  new Set() permet de ne pas avoir de doublons
  let arrayIngredients = new Set();
  let arrayAppliances = new Set();
  let arrayUstensils = new Set();

  // On ajoute dans les Sets au desus les différents éléments
  data.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      arrayIngredients.add(ingredient.ingredient);
    });
  });

  data.forEach((recipe) => {
    arrayAppliances.add(recipe.appliance);
  });

  data.forEach((recipe) => {
    recipe.ustensils.forEach((ustensile) => {
      arrayUstensils.add(ustensile);
    });
  });

  // Trie par ordre alphabétique
  //  et gestion des accents pour bien les placer dans la liste
  let sortedIngredients = [...arrayIngredients].sort((a, b) =>
    a.localeCompare(b, 'fr', { sensitivity: 'base' })
  );
  let sortedAppareils = [...arrayAppliances].sort((a, b) =>
    a.localeCompare(b, 'fr', { sensitivity: 'base' })
  );
  let sortedUstensils = [...arrayUstensils].sort((a, b) =>
    a.localeCompare(b, 'fr', { sensitivity: 'base' })
  );

  // Création des éléments <li> dans les listes correspondantes
  sortedIngredients.forEach((ingredient) => {
    let li = document.createElement('li');
    li.textContent = ingredient;
    li.classList.add('hover:bg-yellow', 'pb-2', 'li');
    listIngredients.appendChild(li);
  });

  sortedAppareils.forEach((appliance) => {
    let li = document.createElement('li');
    li.textContent = appliance;
    li.classList.add('hover:bg-yellow', 'pb-2');
    listAppliances.appendChild(li);
  });

  sortedUstensils.forEach((ustensile) => {
    let li = document.createElement('li');
    li.textContent = ustensile;
    li.classList.add('hover:bg-yellow', 'pb-2');
    listUstensils.appendChild(li);
  });

  // Ajout des listes dans les conteneurs
  ingredientsBlock.appendChild(listIngredients);
  appareilsBlock.appendChild(listAppliances);
  ustensilsBlock.appendChild(listUstensils);
  filterInputSearch(listIngredients);
  filterInputSearch(listAppliances);
  filterInputSearch(listUstensils);

  return { listIngredients, listAppliances, listUstensils };
}

// Création et gestion des boutons de filtres
export function addButtonsListeners() {
  // Les 3 boutons : INGREDIENTS, APPAREILS, USTENSILES
  const ingredientsButton = document.getElementById('ingredients-button');
  const appliancesButton = document.getElementById('appliances-button');
  const ustensilsButton = document.getElementById('ustensils-button');

  // Les 3 listes : INGREDIENTS, APPAREILS, USTENSILES
  const ingredientsMenu = document.querySelector('.ingredients-content');
  const appareilsMenu = document.querySelector('.appareils-content');
  const ustensilsMenu = document.querySelector('.ustensils-content');

  function toggleVector() {
    console.log('oui');
  }

  // Ecoute du clique sur le bouton pour afficher le menu correspondant
  ingredientsButton.addEventListener('click', () => {
    toggleVector();
    const isOpen = ingredientsMenu.getAttribute('data-open');
    ingredientsMenu.setAttribute(
      'data-open',
      isOpen === 'true' ? 'false' : 'true'
    );
  });

  appliancesButton.addEventListener('click', () => {
    toggleVector();
    const isOpen = appareilsMenu.getAttribute('data-open');
    appareilsMenu.setAttribute(
      'data-open',
      isOpen === 'true' ? 'false' : 'true'
    );
  });

  ustensilsButton.addEventListener('click', () => {
    toggleVector();
    const isOpen = ustensilsMenu.getAttribute('data-open');
    ustensilsMenu.setAttribute(
      'data-open',
      isOpen === 'true' ? 'false' : 'true'
    );
  });

  // ECOUTE DU CLIQUE EN DEHORS DES LISTES
  // window.addEventListener('click', (e) => {
  //   if (
  //     !e.target.matches('.filter-button') &&
  //     !e.target.matches('#ingredients-content form')
  //   ) {
  //     // Cache les listes
  //     ingredientsMenu.setAttribute('data-open', 'false');
  //     appareilsMenu.setAttribute('data-open', 'false');
  //     ustensilsMenu.setAttribute('data-open', 'false');
  //   } else {
  //     console.log('windowClicker failed !');
  //   }
  // });
}

// Gestion des filtres
export function displaySelectedFilters(filterTarget, filters) {
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
  filterName.textContent = filterTarget;

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

  // Assemblage des éléments
  selectedFilter.appendChild(filterName);
  selectedFilter.appendChild(filterCloseButton);
  selectedFiltersDiv.appendChild(selectedFilter);
}
