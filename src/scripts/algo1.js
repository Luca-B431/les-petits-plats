export function searchData(data, filters) {
  let searchDatas = data; // On commence avec toutes les données

  //  Si la condition des 3 caractères est remplie, je filtre les données
  if (filters.search.length > 3) {
    searchDatas = searchDatas.filter((recipe) => {
      return (
        recipe.name.includes(filters.search) ||
        recipe.description.includes(filters.search) ||
        recipe.ingredients.some((ingredient) => {
          return ingredient.ingredient.includes(filters.search);
        })
      );
    });
    console.log('Je suis dans la condition 1');
    console.log(searchDatas);
  }

  // Si un filtrage par ingrédients est en cours, on filtre les données
  if (filters.ingredients.selected.length > 0) {
    searchDatas = searchDatas.filter((recipe) => {
      // On vérifie que tous les ingrédients sélectionnés sont présents dans la recette
      return filters.ingredients.selected.every((selectedIngredient) => {
        return recipe.ingredients.some((ingredient) => {
          return ingredient.ingredient === selectedIngredient;
        });
      });
    });
    console.log('Je suis dans la condition 2');
    console.log(searchDatas);
  }

  // Si un filtrage par appareil est en cours, je filtre les données
  if (filters.appliances.selected.length > 0) {
    searchDatas = searchDatas.filter((recipe) => {
      return filters.appliances.selected.includes(recipe.appliance);
    });
    console.log('Je suis dans la condition 3');
    console.log(searchDatas);
  }

  // Si un filtrage par ustensiles est en cours, je filtre les données
  if (filters.ustensils.selected.length > 0) {
    searchDatas = searchDatas.filter((recipe) => {
      return recipe.ustensils.some((ustensil) => {
        return filters.ustensils.selected.includes(ustensil);
      });
    });
    console.log('Je suis dans la condition 4');
    console.log(searchDatas);
  }

  // Si aucun filtre n'a été appliqué, on retourne l'ensemble des données
  if (searchDatas.length === 0) {
    console.log('Aucune recette ne correspond aux critères de recherche.');
  }

  return searchDatas; // Retourner les données filtrées
}
