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
} from './utils.js';

export let filters = {
  search: '',
  ingredients: { selected: [] },
  appliances: { selected: null },
  ustensils: { selected: [] },
};
// let saveSearchsDatas = {};

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

  // InputDeviceInfo, je manipule les données utilistauer insérer dans la barre de recherche
  let searchdatas = searchData(newData, filters);
  // saveSearchsDatas = searchdatas;

  if (searchdatas) {
    // COMPORTEMENT BARRE REMPLIE
    displayRecipes(searchdatas);
    addFilterList(searchdatas, filters);
  }

  if (search === '') {
    // COMPORTEMENT BARRE VIDE
    emptySearch();
  }
});

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
