import { POOL, CAPITALIZE_WORDS } from '../constants.js';

/**
 * Fetches the ingredients for a specific recipe from the database.
 *
 * This function retrieves the ingredients, including name, quantity,
 * and unit, for a given recipe identified by its ID. The ingredient names
 * are formatted to capitalize each word.
 *
 * @param {number} id - The ID of the recipe for which to retrieve ingredients.
 * @returns {Array<Object>} An array of ingredient objects, each containing
 *          the name (capitalized), quantity, and unit for the recipe.
 * @throws {Error} If the database query fails.
 */
export const getIngredientsForRecipe = async (id) => {
	const [rows] = await POOL.query(
		'SELECT name, quantity, unit FROM `ingredients` WHERE recipe_id = ? ORDER BY name ASC',
		[id]
	);

	// Apply the capitalizeWords function to each ingredient's name
	const formatIngredients = rows.map((row) => ({
		...row,
		name: CAPITALIZE_WORDS(row.name), // Capitalize the name of the ingredient
	}));

	return formatIngredients; // Return the formatted ingredients
};
