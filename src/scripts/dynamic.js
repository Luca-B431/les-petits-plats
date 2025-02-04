import { filters } from '/src/scripts/index.js';

console.log(filters);
// Ecoute des cliques sur les différentes listes
const allIngredientsLi = document.querySelectorAll('#ingredients-list li');
const appliancesList = document.getElementById('appareils-list');
const ustensilsList = document.getElementById('ustensils-list');

if (allIngredientsLi) {
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
}

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

// AMMENER; displaySelectedFilters(); (surement dans les listeners)
