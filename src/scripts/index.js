// import des donnés du json
import data from '../data/recipes.json';
// import de mon algorithme n°1
import { searchData } from '/src/scripts/algo2';
// import de mes fonctions déclarées dans utils.js
import {
  formatData,
  submitButton,
  displayRecipes,
  addFilterList,
  addButtonsListeners,
  emptySearch,
  displaySelectedFilters,
  cleanList,
  displayRecipeCount,
  escapeHtml,
} from './utils.js';

// Initialisation de la variable de stock des saisies utilisateurs
export let filters = {
  search: '',
  ingredients: { selected: [] },
  appliances: { selected: [] },
  ustensils: { selected: [] },
};

// Initialisation de searchdatas
// (données de recherche dans les recherches plus bas dans le fichier)
let searchdatas = [];

// APPEL FONCTIONS GLOBALES

// Gestion du bouton de la barre de recherche
submitButton();
// Ajout des listeners sur les 3 boutons de filtres
addButtonsListeners();
// Comportement pour recherche vide ou critère non défini dans les recettes
const unfindablesSearch = (search) => {
  // Si la barre de recherche est vide, on exécute la fonction emptySearch
  if (search === '') {
    displayRecipes(newData);
    displayRecipeCount(newData);
    cleanList();
    addFilterList(newData, filters);
    return;
  }

  let found = false;

  data.forEach((recipe) => {
    const isFound =
      recipe.name.includes(search) ||
      recipe.description.includes(search) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.ingredient.includes(search)
      );

    if (isFound) {
      found = true;
      console.log(recipe);
    }
  });

  // Inexistant alors afficher le message
  if (!found) {
    emptySearch();
  }
};

// je formate les datas pour qu'elles aient toutes une majuscule
let newData = formatData(data);

// -----------------------------------------------------------------------------

// CREARION DE LA LISTE DE RECETTES AU CHARGEMENT
// 50 RECETTES

const container = document.getElementById('grid-container');

displayRecipes(newData);
addFilterList(newData, filters);
displayRecipeCount(newData);

// -----------------------------------------------------------------------------

// RECHERCHE AVEC LA BARRE DE RECHERCHE (

const searchBar = document.getElementById('search');

// Ecoute du changement d'état de la barre de recherche
searchBar.addEventListener('change', () => {
  // Vide le container et maintenir son style
  container.innerHTML = '';
  container.classList.add(
    'grid',
    'w-full',
    'max-w-screen-2xl',
    'grid-cols-3',
    'place-items-center',
    'justify-center',
    'gap-12',
    'bg-[#eeeeee]',
    'px-24'
  );

  let search = searchBar.value.toLowerCase();
  search = escapeHtml(search);
  filters.search = search;

  // Ici, je manipule les données utilisateur insérées dans la barre de recherche
  searchdatas = searchData(newData, filters);

  //  Affichage des recettes équivalentes à la recherche de l'utilisateur
  // sinon on affiche un message à l'utilisateur
  if (searchdatas !== undefined) {
    // COMPORTEMENT BARRE REMPLIE
    displayRecipes(searchdatas);
    displayRecipeCount(searchdatas);
    cleanList();
    addFilterList(searchdatas);
    liListener();
  }

  unfindablesSearch(search);
});
// )

// -----------------------------------------------------------------------------

// RECHERCHE AVEC LES LISTES D'INGREDIENTS, D'APPAREILS ET D'USTENSILES (

function liListener() {
  // Écouteurs d'événements avec une délégation d'événements
  // On écoute sur le parent, donc même si les éléments <li> sont ajoutés/détachés, ça marche toujours
  const ingredientsList = document.getElementById('ingredients-list');
  const appliancesList = document.getElementById('appliances-list');
  const ustensilsList = document.getElementById('ustensils-list');

  // Écoute des clics sur les éléments de la liste des ingrédients
  ingredientsList.addEventListener('click', (e) => {
    const liElem = e.target;

    if (liElem.tagName === 'LI') {
      // Ingredients prends la valeur de l'élément cliqué
      const ingredient = liElem.innerText;
      let filterTarget = ingredient;

      if (!filters.ingredients.selected.includes(ingredient)) {
        filters.ingredients.selected.push(ingredient);
        console.log(filters.ingredients.selected);

        container.innerHTML = '';
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

        searchdatas = searchData(newData, filters);
        displaySelectedFilters(filterTarget);
        displayRecipes(searchdatas);
        displayRecipeCount(searchdatas);
        cleanList();
        addFilterList(searchdatas, filters);
        checkIfContainerIsEmpty();
      } else {
        console.log('Cet ingrédient est déjà sélectionné');
      }
    }
  });

  // Écoute des clics sur les éléments de la liste des appareils
  appliancesList.addEventListener('click', (e) => {
    const liElem = e.target;
    if (liElem.tagName === 'LI') {
      const appliance = liElem.innerText;
      let filterTarget = appliance;

      if (!filters.appliances.selected.includes(appliance)) {
        filters.appliances.selected.push(appliance);

        container.innerHTML = '';
        container.classList.add(
          'grid',
          'w-full',
          'max-w-screen-2xl',
          'grid-cols-3',
          'place-items-center',
          'justify-center',
          'gap-12',
          'bg-[#eeeeee]',
          'px-24'
        );

        searchdatas = searchData(newData, filters);
        displaySelectedFilters(filterTarget);
        displayRecipes(searchdatas);
        displayRecipeCount(searchdatas);
        cleanList();
        addFilterList(searchdatas, filters);
        checkIfContainerIsEmpty();
      } else {
        console.log('Appareil déjà sélectionné');
      }
    }
  });

  // Écoute des clics sur les éléments de la liste des ustensiles
  ustensilsList.addEventListener('click', (e) => {
    const liElem = e.target;
    if (liElem.tagName === 'LI') {
      const ustensil = liElem.innerText;
      let filterTarget = ustensil;

      if (!filters.ustensils.selected.includes(ustensil)) {
        filters.ustensils.selected.push(ustensil);

        container.innerHTML = '';
        container.classList.add(
          'grid',
          'w-full',
          'max-w-screen-2xl',
          'grid-cols-3',
          'place-items-center',
          'justify-center',
          'gap-12',
          'bg-[#eeeeee]',
          'px-24'
        );

        searchdatas = searchData(newData, filters);
        displaySelectedFilters(filterTarget);
        displayRecipes(searchdatas);
        displayRecipeCount(searchdatas);
        cleanList();
        addFilterList(searchdatas, filters);
        checkIfContainerIsEmpty();
      } else {
        console.log('Ustensile déjà sélectionné');
      }
    }
  });
}

liListener();

// )

// -----------------------------------------------------------------------------

// SUPPRESSION DES FILTRES SELECTIONNÉS

const selectedFiltersContainer = document.getElementById('selected-filters');

// Vérifie si le conteneur est vide et le cache si c'est le cas
function checkIfContainerIsEmpty() {
  if (selectedFiltersContainer.children.length === 0) {
    selectedFiltersContainer.classList.add('hidden');
    container.innerHTML = '';

    emptySearch();
    addFilterList(searchdatas, filters);
    if (filters.search === '') {
      cleanList();
      addFilterList(newData);
    }
  } else {
    selectedFiltersContainer.classList.remove('hidden');
  }
}

selectedFiltersContainer.addEventListener('click', (e) => {
  // Vérifie si le clic provient d'un élément ayant la classe "filter-close-cross"
  if (e.target.classList.contains('filter-close-cross')) {
    // Sélectionne le parent le plus proche avec la classe "filter-tag" qui contient la croix
    const filterTag = e.target.closest('.filter-tag');

    // Si filterTag existe, on peut procéder à sa suppression
    if (filterTag) {
      const filterText = filterTag.innerText.trim();

      // Suppression du filtre de la liste des ingrédients, appareils ou ustensiles
      if (filters.ingredients.selected.includes(filterText)) {
        filters.ingredients.selected = filters.ingredients.selected.filter(
          (ingredient) => ingredient !== filterText
        );
      }

      if (filters.appliances.selected.includes(filterText)) {
        filters.appliances.selected = filters.appliances.selected.filter(
          (appliance) => appliance !== filterText
        );
      }

      if (filters.ustensils.selected.includes(filterText)) {
        filters.ustensils.selected = filters.ustensils.selected.filter(
          (ustensil) => ustensil !== filterText
        );
      }

      // Supprime l'élément de l'interface
      filterTag.remove();

      // Met à jour l'affichage des recettes
      container.innerHTML = '';
      container.classList.add(
        'grid',
        'w-full',
        'max-w-screen-2xl',
        'grid-cols-3',
        'place-items-center',
        'justify-center',
        'gap-12',
        'bg-[#eeeeee]',
        'px-24'
      );

      searchdatas = searchData(newData, filters);
      displayRecipes(searchdatas);
      cleanList();
      addFilterList(searchdatas, filters);
      liListener();
    }
    checkIfContainerIsEmpty();
  }
});
