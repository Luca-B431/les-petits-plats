// import des donnés du json
import data from '../data/recipes.json';
// import de mon algorithme n°1
import { searchData } from '/src/scripts/algo1';
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
} from './utils.js';

// Initialisation de la variable de stock des saisies utilisateurs
export let filters = {
  search: '',
  ingredients: { selected: [] },
  appliances: { selected: '' },
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

// je formate les datas pour qu'elles aient toutes une majuscule
let newData = formatData(data);

// -----------------------------------------------------------------------------

// AFFICHAGE DE BASE AVEC 10 RECETTES (

const container = document.getElementById('grid-container');

let tenCardsData = newData.slice(0, 10);
displayRecipes(tenCardsData);
addFilterList(tenCardsData, filters);

// )

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

  const search = searchBar.value.toLowerCase();
  filters.search = search;
  console.log(filters);

  // Ici, je manipule les données utilisateur insérées dans la barre de recherche
  searchdatas = searchData(newData, filters);

  //  Affichage des recettes équivalentes à la recherche de l'utilisateur
  // sinon on affiche un message à l'utilisateur
  if (searchdatas !== undefined) {
    // COMPORTEMENT BARRE REMPLIE
    displayRecipes(searchdatas);
    cleanList();
    addFilterList(searchdatas);
    liListener();
  }

  if (search === '') {
    // COMPORTEMENT BARRE VIDE
    emptySearch();
  }
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

      if (filters.appliances.selected !== appliance) {
        filters.appliances.selected = appliance;

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
  } else {
    selectedFiltersContainer.classList.remove('hidden');
  }
}

selectedFiltersContainer.addEventListener('click', (e) => {
  // Vérifie si le clic provient d'un élément ayant l'ID "filter-close-cross"
  if (e.target.classList.contains('filter-close-cross')) {
    const filterTag = document.querySelector('.filter-tag');
    filterTag.remove();

    if (filters.ingredients.selected.includes(filterTag.innerText)) {
      filters.ingredients.selected = filters.ingredients.selected.filter(
        (ingredient) => ingredient !== filterTag.innerText
      );

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

    if (filters.appliances.selected === filterTag.innerText) {
      filters.appliances.selected = '';

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

    if (filters.ustensils.selected.includes(filterTag.innerText)) {
      filters.ustensils.selected = filters.ustensils.selected.filter(
        (ustensil) => ustensil !== filterTag.innerText
      );

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
