import { POOL, CAPITALIZE_WORDS } from '../constants.js';

/**
 * Retrieves the meat types associated with a specific recipe from the database.
 *
 * This function queries the database for the meat types linked to
 * the recipe identified by the provided ID and returns them in a formatted structure.
 *
 * @param {number} id - The ID of the recipe for which to retrieve meat types.
 * @returns {Array<Object>} An array of meat type objects associated with the recipe.
 *          Each object includes the meat type details, with names capitalized.
 * @throws {Error} If the database query fails.
 */
export const getRecipeMeatTypes = async (id) => {
	const [rows] = await POOL.query(
		`SELECT meat_types.*
			FROM recipe_meat_types
			JOIN meat_types ON recipe_meat_types.meat_id = meat_types.id
			WHERE recipe_meat_types.recipe_id = ?;
		`,
		[id]
	);

	// Format meat data by capitalizing meat type names
	const formatMeatData = rows.map((row) => ({
		...row,
		name: CAPITALIZE_WORDS(row.name),
	}));

	return formatMeatData; // Return formatted meat type data
};
