export function searchData(data, filters) {
  // Init
  const result = [];

  for (let i = 0; i < data.length; i++) {
    const recipe = data[i];

    // On va tester sur chaque recette si elle correspond aux filtres sélectionnés

    // On va avoir une variable truthy ou falsy "match" pour chaque type de filtre
    // qui va nous permettre de savoir si la recette correspond aux filtres

    let hasSearchMatch = true;
    if (filters.search.length > 3) {
      hasSearchMatch =
        recipe.name.includes(filters.search) ||
        recipe.description.includes(filters.search) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.ingredient.includes(filters.search)
        );
    }

    let hasIngredientsMatch = true;
    if (filters.ingredients.selected.length > 0) {
      hasIngredientsMatch = true;
      for (let ing = 0; ing < filters.ingredients.selected.length; ing++) {
        const selectedIngredient = filters.ingredients.selected[ing];
        let ingredientMatch = false;
        for (let ING = 0; ING < recipe.ingredients.length; ING++) {
          const ingredient = recipe.ingredients[ING];
          if (ingredient.ingredient === selectedIngredient) {
            ingredientMatch = true;
            break;
          }
        }
        if (!ingredientMatch) {
          hasIngredientsMatch = false;
          break;
        }
      }
    }

    let hasApplianceMatch = true;
    if (filters.appliances.selected.length > 0) {
      hasApplianceMatch = false;
      for (let A = 0; A < filters.appliances.selected.length; A++) {
        if (recipe.appliance === filters.appliances.selected[A]) {
          hasApplianceMatch = true;
          break;
        }
      }
    }

    let hasUstensilsMatch = true;
    if (filters.ustensils.selected.length > 0) {
      hasUstensilsMatch = true;
      for (let ust = 0; ust < filters.ustensils.selected.length; ust++) {
        const selectedUstensil = filters.ustensils.selected[ust];
        let ustensilMatch = false;
        for (let UST = 0; UST < recipe.ustensils.length; UST++) {
          if (recipe.ustensils[UST] === selectedUstensil) {
            ustensilMatch = true;
            break;
          }
        }
        if (!ustensilMatch) {
          hasUstensilsMatch = false;
          break;
        }
      }
    }

    if (
      hasSearchMatch &&
      hasIngredientsMatch &&
      hasApplianceMatch &&
      hasUstensilsMatch
    ) {
      result.push(recipe);
    }
  }

  return result;
}

// Benchmark test :

// ~ 4529738 opération par seconde selon JSben.ch
