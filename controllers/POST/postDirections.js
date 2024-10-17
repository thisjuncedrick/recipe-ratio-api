import { POOL } from '../constants.js';

/**
 * Inserts an array of directions into the directions table.
 *
 * This function takes a recipe ID and an array of direction objects, each containing
 * a description, duration, and duration unit. It inserts the directions into the
 * `directions` table for the provided recipe.
 *

 * @param {number} recipe_id - The ID of the recipe for which the directions are being added.
 * @param {Object[]} directions - An array of directions to be inserted.
 * @param {string} directions[].description - The description of the step in the direction.
 * @param {number} directions[].duration - The duration for performing the step.
 * @param {string} directions[].duration_unit - The unit of time for the duration (e.g., 'sec', 'min', 'hr').
 * @returns {Promise<void>} Resolves when the directions are successfully inserted into the database.
 * @throws {Error} If there is an issue executing the database query.
 */
export const postDirections = async (recipe_id, directions) => {
	const base_query =
		'INSERT INTO `directions` (recipe_id, description, duration, duration_unit) VALUES ?';

	const values = directions.map((direction) => [
		recipe_id,
		direction.description,
		direction.duration,
		direction.duration_unit,
	]);

	await POOL.query(base_query, [values]);
};
