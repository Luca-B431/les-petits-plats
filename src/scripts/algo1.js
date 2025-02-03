export function searchData(search, data, filters) {
  let condition = false;

  if (search.length > 3) {
    condition = true;
  }
  let searchDatas = [];

  //  Si la condition des 3 caractères est remplie, je filtre les données
  if (condition) {
    searchDatas = data.filter((recipe) => {
      return (
        recipe.name.includes(search) ||
        recipe.description.includes(search) ||
        recipe.ingredients.some((ingredient) => {
          return ingredient.ingredient.includes(search);
        })
      );
    });
    return searchDatas;
  }

  // Si un filtrage par ingrédients est en cours, je filtre les données
  if (filters.ingredients.selected.length > 0) {
    searchDatas = data.filter((recipe) => {
      return recipe.ingredients.some((ingredient) => {
        return filters.ingredients.selected.includes(ingredient.ingredient);
      });
    });
    return searchDatas;
  }

  // Si un filtrage par appareil est en cours, je filtre les données
  if (filters.appliances.selected.length > 0) {
    searchDatas = data.filter((recipe) => {
      return filters.appliances.selected.includes(recipe.appliance);
    });
    return searchDatas;
  }

  // Si un filtrage par ustensiles est en cours, je filtre les données
  if (filters.ustensils.selected.length > 0) {
    searchDatas = data.filter((recipe) => {
      return recipe.ustensils.some((ustensil) => {
        return filters.ustensils.selected.includes(ustensil);
      });
    });
    return searchDatas;
  }

  // if (search + filters) {}
}
