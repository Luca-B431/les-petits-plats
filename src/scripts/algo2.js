export function searchData(data, filters) {
  return data.filter((recipe) => {
    const conditions = [
      {
        active: filters.search.length > 3,
        check: () =>
          recipe.name.includes(filters.search) ||
          recipe.description.includes(filters.search) ||
          recipe.ingredients.some((ingredient) =>
            ingredient.ingredient.includes(filters.search)
          ),
      },
      {
        active: filters.ingredients.selected.length > 0,
        check: () =>
          filters.ingredients.selected.every((selectedIngredient) =>
            recipe.ingredients.some(
              (ingredient) => ingredient.ingredient === selectedIngredient
            )
          ),
      },
      {
        active: filters.appliances.selected.length > 0,
        check: () => filters.appliances.selected.includes(recipe.appliance),
      },
      {
        active: filters.ustensils.selected.length > 0,
        check: () =>
          filters.ustensils.selected.every((selectedUstensil) =>
            recipe.ustensils.includes(selectedUstensil)
          ),
      },
    ];

    // Vérifie toutes les conditions actives avec une boucle
    for (const condition of conditions) {
      if (condition.active && !condition.check()) {
        return false;
      }
    }
    return true;
  });
}
