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
  handleClick,
} from './utils.js';

let filters = {
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

// Ecoute des cliques sur les différentes listes
const allIngredientsLi = document.querySelectorAll('#ingredients-list li');
const appliancesList = document.getElementById('appareils-list');
const ustensilsList = document.getElementById('ustensils-list');

// if (allIngredientsLi) {
// !!
allIngredientsLi.forEach((liElem) => {
  // !!
  liElem.addEventListener('click', () => {
    console.log('click');
    // Ingredients prends la valeur de l'élément cliqué
    const ingredient = liElem.innerText;

    // On push l'élément cliqué dans le tableau des ingrédients sélectionnés
    filters.ingredients.selected.push(ingredient);

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

    // On filtre les données en fonction des filtres
    // On affiche les recettes filtrées
    // on mets à jour la liste des filtres
    let searchdatas = searchData(newData, filters);
    displayRecipes(searchdatas);
    addFilterList(searchdatas, filters);

    // Suppression du listener
    handleClick;
  });
});
// }

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
