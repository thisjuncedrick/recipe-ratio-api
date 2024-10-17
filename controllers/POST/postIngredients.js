import { POOL } from '../constants.js';

/**
 * Inserts an array of ingredients into the ingredients table.
 *
 * Takes a recipe ID and an array of ingredient objects, each containing
 * a name, quantity, and unit, and inserts them into the `ingredients` table
 * for the given recipe.
 *

 * @param {number} recipe_id - The ID of the recipe.
 * @param {Object[]} ingredients - The list of ingredients to insert.
 * @param {string} ingredients[].name - The name of the ingredient.
 * @param {number} ingredients[].quantity - The amount of the ingredient.
 * @param {string} ingredients[].unit - The unit of measurement (e.g., 'g', 'ml').
 * @returns {Promise<void>} Resolves once ingredients are inserted.
 * @throws {Error} If there is an issue with the query.
 */
export const postIngredients = async (recipe_id, ingredients) => {
	const base_query = 'INSERT INTO `ingredients` (recipe_id, name, quantity, unit) VALUES ?';

	const values = ingredients.map((ingredient) => [
		recipe_id,
		ingredient.name,
		ingredient.quantity,
		ingredient.unit,
	]);

	await POOL.query(base_query, [values]);
};
