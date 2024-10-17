import { POOL } from '../constants.js';

/**
 * Retrieves a recipe from the database by its ID.
 *
 * This function queries the database for a specific recipe
 * identified by the provided ID and returns the recipe details.
 *
 * @param {number} id - The ID of the recipe to retrieve.
 * @returns {Array<Object>} An array containing the recipe object.
 *          If no recipe is found, an empty array is returned.
 * @throws {Error} If the database query fails.
 */
export const getRecipe = async (id) => {
	const [rows] = await POOL.query('SELECT * FROM `recipes` WHERE id = ?', [id]);
	return rows; // Return the recipe details
};
