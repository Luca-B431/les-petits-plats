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
} from './utils.js';

export let filters = {
  search: '',
  ingredients: { selected: [] },
  appliances: { selected: '' },
  ustensils: { selected: [] },
};
let searchdatas = [];

// APPEL FONCTIONS GLOBALES

// Gestion du bouton de la barre de recherche
submitButton();
// Ajout des listeners sur les 3 boutons de filtres
addButtonsListeners();

// je formate les datas pour qu'elles aient toutes une majuscule
let newData = formatData(data);

const container = document.getElementById('grid-container');
// affichage des 10 premières recettes comme sur la maquette
let tenCardsData = newData.slice(0, 10);
displayRecipes(tenCardsData);
addFilterList(tenCardsData, filters);

const searchBar = document.getElementById('search');

// Ecoute du changement d'état de la barre de recherche
searchBar.addEventListener('change', () => {
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

  // Ici, je manipule les données utilistauer insérer dans la barre de recherche
  searchdatas = searchData(newData, filters);
  console.log(searchdatas);

  if (searchdatas !== undefined) {
    // COMPORTEMENT BARRE REMPLIE
    displayRecipes(searchdatas);
    addFilterList(searchdatas);
  } else {
    // COMPORTEMENT BARRE VIDE
    emptySearch();
  }
});

// Ecoute des cliques sur les différentes listes
const allIngredientsLi = document.querySelectorAll('#ingredients-list li');
const allAppliancesList = document.querySelectorAll('#appliances-list li');
const allUstensilsList = document.querySelectorAll('#ustensils-list li');

// !!
allIngredientsLi.forEach((liElem) => {
  // !!
  liElem.addEventListener('click', () => {
    console.log('click');
    // Ingredients prends la valeur de l'élément cliqué
    const ingredient = liElem.innerText;

    let filterTarget = ingredient;
    displaySelectedFilters(filterTarget, filters);

    // On push l'élément cliqué dans le tableau des ingrédients sélectionnés
    if (!filters.ingredients.selected.includes(ingredient)) {
      filters.ingredients.selected.push(ingredient);
    }
    console.log(filters);
    // Gestion du style et du contenu du container
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

    // Si la barre de recherche est vide, je filtre les données
    if (searchdatas) {
      searchdatas = searchData(newData, filters);
      displayRecipes(searchdatas);
      addFilterList(searchdatas, filters);
      console.log('Barre de recherche vide');
    }
  });
});

allAppliancesList.forEach((liElem) => {
  liElem.addEventListener('click', () => {
    const appliance = liElem.innerText;

    if (filters.appliances.selected !== appliance) {
      filters.appliances.selected = appliance;
    }

    console.log(filters);
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

    let searchdatas = searchData(newData, filters);
    displayRecipes(searchdatas);
    addFilterList(searchdatas, filters);
  });
});

allUstensilsList.forEach((liElem) => {
  liElem.addEventListener('click', (e) => {
    const ustensil = e.target.innerText;

    if (!filters.ustensils.selected.includes(ustensil)) {
      filters.ustensils.selected.push(ustensil);
    }

    console.log(filters);
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

    let searchdatas = searchData(newData, filters);
    displayRecipes(searchdatas);
    addFilterList(searchdatas, filters);
  });
});

// AMMENER; displaySelectedFilters(); (surement dans les listeners)

// IMPORTANT :

// (ici)
// ammener les boutons, refaire les fonctions
// sortir la fonction des vecteurs
// check le window listener de la function
// check les conditions négatives de cliques (erreur sur la sorite des tabs)
// puis check les list et les li listeners

// Ensuite :
// check addFilterList()

// sur dynamic.js :
// setup les imports
// check les dom elements
// importer tout le dynamique
