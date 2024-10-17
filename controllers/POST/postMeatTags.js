import { POOL } from '../constants.js';

/**
 * Inserts meat tags into the recipe_meat_types table.
 *
 * Takes a recipe ID and an array of meat type objects, each containing
 * a name, and associates them with the specified recipe by inserting
 * entries into the `recipe_meat_types` table.
 *

 * @param {number} recipe_id - The ID of the recipe.
 * @param {Object[]} meats - The list of meat types to insert.
 * @param {string} meats[].meat - The name of the meat type to associate with the recipe.
 * @returns {Promise<void>} Resolves once the meat tags are inserted.
 * @throws {Error} If there is an issue with the query.
 */
export const postMeatTags = async (recipe_id, meats) => {
	const base_query =
		'INSERT INTO recipe_meat_types (recipe_id, meat_id) SELECT ?, id FROM meat_types WHERE name = ?';

	for (const meatType of meats) {
		await POOL.query(base_query, [recipe_id, meatType.meat]);
	}
};
