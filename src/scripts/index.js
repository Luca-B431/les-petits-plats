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
  filtersButtons,
  emptySearch,
} from './utils.js';

let filters = {
  search: '',
  ingredients: { selected: [] },
  appliances: { selected: null },
  ustensils: { selected: [] },
};

// je formate les datas pour qu'elles aient toutes une majuscule
let newData = formatData(data);

const container = document.getElementById('grid-container');
// affichage des 10 premières recettes comme sur la maquette
let tenCardsData = newData.slice(0, 10);
displayRecipes(tenCardsData);
addFilterList(tenCardsData, filters);
filtersButtons();

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

  // InputDeviceInfo, je manipule les données utilistauer insérer dans la barre de recherche
  let searchdatas = searchData(search, newData, filters);
  if (searchdatas) {
    // COMPORTEMENT BARRE REMPLIE
    displayRecipes(searchdatas);
    addFilterList(searchdatas, filters);
  } else {
    // COMPORTEMENT BARRE VIDE
    emptySearch();
    addFilterList(newData, filters);
  }
});

// Ecoute des clicques sur les différentes listes
const ingredientsList = document.getElementById('ingredients-list');
const appliancesList = document.getElementById('appliances-list');
const ustensilsList = document.getElementById('ustensils-list');

ingredientsList.addEventListener('click', (e) => {
  const ingredient = e.target.innerText;
  filters.ingredients.selected.push(ingredient);
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

  let searchdatas = searchData(searchBar, newData, filters);
  displayRecipes(searchdatas);
  addFilterList(searchdatas, filters);
});

appliancesList.addEventListener('click', (e) => {
  const appliance = e.target.innerText;
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

  let searchdatas = searchData(searchBar, newData, filters);
  displayRecipes(searchdatas);
  addFilterList(searchdatas, filters);
});

ustensilsList.addEventListener('click', (e) => {
  const ustensil = e.target.innerText;
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

  let searchdatas = searchData(searchBar, newData, filters);
  displayRecipes(searchdatas);
  addFilterList(searchdatas, filters);
});

submitButton();
