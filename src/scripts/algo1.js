export function searchData(data, filters) {
  return data.filter((recipe) => {
    const hasSearchMatch =
      filters.search.length > 3
        ? recipe.name.includes(filters.search) ||
          recipe.description.includes(filters.search) ||
          recipe.ingredients.some((ingredient) =>
            ingredient.ingredient.includes(filters.search)
          )
        : true;

    const hasIngredientsMatch =
      filters.ingredients.selected.length > 0
        ? filters.ingredients.selected.every((selectedIngredient) =>
            recipe.ingredients.some(
              (ingredient) => ingredient.ingredient === selectedIngredient
            )
          )
        : true;

    const hasApplianceMatch =
      filters.appliances.selected.length > 0
        ? filters.appliances.selected.includes(recipe.appliance)
        : true;

    const hasUstensilsMatch =
      filters.ustensils.selected.length > 0
        ? filters.ustensils.selected.every((selectedUstensil) =>
            recipe.ustensils.includes(selectedUstensil)
          )
        : true;

    return (
      hasSearchMatch &&
      hasIngredientsMatch &&
      hasApplianceMatch &&
      hasUstensilsMatch
    );
  });
}

// Benchmark test :
// (le plus efficient)

// ~ 4801780 opérations par seconde selon JSben.ch
