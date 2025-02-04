export function searchData(data, filters) {
  let searchDatas = [];

  //  Si la condition des 3 caractères est remplie, je filtre les données
  if (filters.search.length > 3) {
    searchDatas = data.filter((recipe) => {
      return (
        recipe.name.includes(filters.search) ||
        recipe.description.includes(filters.search) ||
        recipe.ingredients.some((ingredient) => {
          return ingredient.ingredient.includes(filters.search);
        })
      );
    });
    return searchDatas;
  } else {
    console.log('Erreur algo1.js : Condition 1');
  }

  if (filters.ingredients.selected.length > 0) {
    // Si un filtrage par ingrédients est en cours, je filtre les données
    searchDatas = data.filter((recipe) => {
      return recipe.ingredients.some((ingredient) => {
        return filters.ingredients.selected.includes(ingredient.ingredient);
      });
    });
    return searchDatas;
  } else {
    console.log('Erreur algo1.js : Condition 2');
  }

  // Si un filtrage par appareil est en cours, je filtre les données
  if (filters.appliances.selected != null) {
    searchDatas = data.filter((recipe) => {
      return filters.appliances.selected.includes(recipe.appliance);
    });
    return searchDatas;
  } else {
    console.log('Erreur algo1.js : Condition 3');
  }

  // Si un filtrage par ustensiles est en cours, je filtre les données
  if (filters.ustensils.selected.length > 0) {
    searchDatas = data.filter((recipe) => {
      return recipe.ustensils.some((ustensil) => {
        return filters.ustensils.selected.includes(ustensil);
      });
    });
    return searchDatas;
  } else {
    console.log('Erreur algo1.js : Condition 4');
  }
}
