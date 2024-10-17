import { POOL } from '../constants.js';

/**
 * Inserts recipe details into the recipes table and returns the recipe ID.
 *
 * This function takes the name, description, and cover image of a recipe,
 * inserts them into the `recipes` table, and retrieves the ID of the newly
 * created recipe for further use by other functions.
 *
 * @param {string} name - The name of the recipe.
 * @param {string} description - The description of the recipe.
 * @param {string} cover_image - The URL of the recipe's cover image.
 * @returns {Promise<Object>} Resolves to an object containing the ID of the inserted recipe.
 * @throws {Error} If there is an issue with the database query.
 */
export const postRecipeDetails = async (name, description, cover_image) => {
	const [result] = await POOL.query(
		'INSERT INTO `recipes` (name, description, cover_image) VALUES (?, ?, ?);',
		[name, description, cover_image]
	);

	const last_inserted_id = result.insertId;

	return { last_inserted_id };
};
