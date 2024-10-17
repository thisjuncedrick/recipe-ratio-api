import { POOL } from '../constants.js';

/**
 * Fetches the directions for a specific recipe from the database.
 *
 * This function retrieves the directions, including the description,
 * duration, and duration unit, for a given recipe identified by its ID.
 *
 * @param {number} id - The ID of the recipe for which to retrieve directions.
 * @returns {Array<Object>} An array of direction objects, each containing
 *          the description, duration, and duration unit for the recipe.
 * @throws {Error} If the database query fails.
 */
export const getDirectionsForRecipe = async (id) => {
	const [rows] = await POOL.query(
		'SELECT description, duration, duration_unit FROM `directions` WHERE recipe_id = ? ORDER BY id ASC',
		[id]
	);
	return rows; // Return the directions retrieved from the database
};
