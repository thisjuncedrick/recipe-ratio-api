import { POOL, CAPITALIZE_WORDS } from '../constants.js';

/**
 * Retrieves all meat types from the database.
 *
 * This function queries the database for all meat types,
 * formats the names to capitalize each word, and returns
 * an array of meat type objects.
 *
 * @returns {Array<Object>} An array of meat type objects,
 *          each containing the id and name (capitalized).
 * @throws {Error} If the database query fails.
 */
export const getMeatTypes = async () => {
	const [rows] = await POOL.query('SELECT * FROM meat_types ORDER BY `meat_types`.`id` ASC');

	// Capitalize the name of each meat type
	const formatMeats = rows.map((row) => ({
		...row,
		name: CAPITALIZE_WORDS(row.name),
	}));

	return formatMeats; // Return the formatted meat types
};
