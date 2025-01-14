/**
 * @typedef {Object} Ingredient
 * @property {string} ingredient - Le nom de l'ingrédient.
 * @property {number} quantity - La quantité de l'ingrédient.
 * @property {string} [unit] - L'unité de mesure de l'ingrédient (optionnel).
 */

/**
 * @typedef {Object} RecipeData
 * @property {string} image - Le nom de l'image associée à la recette.
 * @property {string} name - Le nom de la recette.
 * @property {number} servings - Le nombre de personnes que la recette sert.
 * @property {string} description - La description de la recette.
 * @property {number} time - Le temps de préparation en minutes.
 * @property {Ingredient[]} ingredients - La liste des ingrédients nécessaires pour la recette.
 * @property {string} appliance - L'appareil utilisé pour la recette (ex. cocotte).
 * @property {string[]} ustensils - Liste des ustensiles nécessaires (ex. couteau).
 */

/**
 * Fonction qui génère un modèle (une carte) avec les informations d'une recette.
 *
 * @param {RecipeData} data - L'objet contenant les informations de la recette.
 * @returns {HTMLElement} - L'élément HTML représentant la carte de la recette.
 */
export function getTemplate(data) {
  // Récupération des clés de l'objet pour les utiliser dans la fonction
  const { image, name, serving, description, time, ingredients } = data;

  function createCard() {
    // CREATION DE L'ARTICLE/CARTE
    const card = document.createElement('article');
    card.classList.add(
      'relative',
      'flex',
      'flex-col',
      'w-full',
      'h-[728px]',
      'bg-white',
      'shadow-1',
      'rounded-md',
      'shadow'
    );

    // CREATION DE L'IMAGE
    const cardImage = document.createElement('img');
    cardImage.classList.add('h-64', 'w-full', 'object-cover', 'rounded-t-md');
    cardImage.src = `./public/pictures/${image}`;
    cardImage.alt = name;

    const timeBubble = document.createElement('span');
    timeBubble.classList.add(
      'absolute',
      'z-50',
      'top-4',
      'right-4',
      'bg-yellow',
      'text-black',
      'rounded-full',
      'px-2',
      'py-1',
      'text-xs'
    );
    timeBubble.textContent = `${time} min`;

    // CONTAINER TEXTE DE LA CARTE
    const cardContent = document.createElement('div');
    cardContent.classList.add('flex', 'flex-col', 'gap-4', 'px-8', 'py-6');

    // NOM DE LA RECETTE
    const nameRecipe = document.createElement('h2');
    nameRecipe.textContent = name;
    nameRecipe.classList.add(
      'anton',
      'text-xl',
      'h-8',
      'overflow-hidden',
      'overflow-scroll'
    );

    // Titre "Recette" de la carte
    const recipeTitle = document.createElement('h3');
    recipeTitle.textContent = 'Recette';
    recipeTitle.classList.add('text-[#7A7A7A]');

    // Description de la recette
    const contentRecipe = document.createElement('p');
    contentRecipe.textContent = description;
    contentRecipe.classList.add(
      'text-sm',
      'h-24',
      'overflow-hidden',
      'overflow-scroll'
    );

    // Titre "Ingrédients" de la carte
    const ingredientsTitle = document.createElement('h3');
    ingredientsTitle.classList.add('text-[#7A7A7A]');
    ingredientsTitle.textContent = 'Ingrédients';

    // Liste des ingrédients

    const ingredientsGrid = document.createElement('div');
    ingredientsGrid.classList.add('grid', 'grid-cols-2', 'gap-4');

    console.log(ingredients);

    ingredients.forEach((ingredientItem) => {
      const ingredientsBloc = document.createElement('div');
      ingredientsBloc.classList.add(
        'ingredients-bloc',
        'flex',
        'flex-col',
        'gap-1'
      );

      const ingredientElement = document.createElement('span');
      ingredientElement.textContent = ingredientItem.ingredient;
      ingredientElement.classList.add('text-sm');

      const quantityElement = document.createElement('span');
      quantityElement.classList.add('text-xs', 'text-[#7A7A7A]');
      if ('quantity' in ingredientItem) {
        // Si "quantity" existe
        if ('unit' in ingredientItem) {
          // Si "unit" existe aussi
          quantityElement.textContent = `${ingredientItem.quantity} ${ingredientItem.unit}`;
        } else {
          // Si "unit" n'existe pas
          quantityElement.textContent = `${ingredientItem.quantity}`;
        }
      } else {
        // Si "quantity" n'existe pas
        quantityElement.textContent = '';
      }

      ingredientsGrid.appendChild(ingredientsBloc);
      ingredientsBloc.appendChild(ingredientElement);
      ingredientsBloc.appendChild(quantityElement);
    });

    // Ajout des éléments dans la cart
    card.appendChild(cardImage);
    card.appendChild(timeBubble);
    card.appendChild(cardContent);
    cardContent.appendChild(nameRecipe);
    cardContent.appendChild(recipeTitle);
    cardContent.appendChild(contentRecipe);
    cardContent.appendChild(ingredientsTitle);
    cardContent.appendChild(ingredientsGrid);

    // On retourne la carte créé
    return card;
  }

  // Retour de l'instance en cours du pattern Factory
  return image, name, serving, description, time, ingredients, createCard();
}
