import { ITEM_PER_PAGE, POOL } from '../constants.js';

/**
 * Fetches recipes associated with a specific meat type and search term from the database, supporting pagination.
 *
 * Retrieves a list of recipes that belong to the specified `meatType` and contain the `searchTerm` in either the name or description.
 * Supports pagination to limit the number of recipes returned in a single request.
 *
 * @param {string} meatType - The name of the meat type to filter recipes by.
 * @param {string} searchTerm - The term to search for in recipe names or descriptions (case-insensitive).
 * @param {number} page - The current page number for pagination (1-based indexing).
 * @returns {Promise<{recipes: Object[], total_recipes: number, total_pages: number}>} A promise that resolves to an object containing an array of recipes (`recipes`), the total number of recipes for the given criteria (`total_recipes`), and the total number of pages available (`total_pages`).
 * @throws {Error} If the database query fails.
 */
export const getAllRecipesWithMeat = async (meatType, searchTerm, page) => {
	const offset = (page - 1) * ITEM_PER_PAGE; // Calculate the offset

	// Get the total number of recipes for the given meat type
	const [[{ total_recipes }]] = await POOL.query(
		`SELECT COUNT(*) as total_recipes
			FROM recipes
			JOIN recipe_meat_types ON recipes.id = recipe_meat_types.recipe_id
			JOIN meat_types ON recipe_meat_types.meat_id = meat_types.id
			WHERE meat_types.name = ? AND (recipes.name LIKE ? OR recipes.description LIKE ?)
			ORDER BY recipes.name ASC;`,
		[meatType, `%${searchTerm}%`, `%${searchTerm}%`]
	);
	const total_pages = Math.ceil(total_recipes / ITEM_PER_PAGE); // Calculate total pages

	// Get the recipes with the specified limit and offset
	const [rows] = await POOL.query(
		`SELECT recipes.*
			FROM recipes
			JOIN recipe_meat_types ON recipes.id = recipe_meat_types.recipe_id
			JOIN meat_types ON recipe_meat_types.meat_id = meat_types.id
			WHERE meat_types.name = ? AND (recipes.name LIKE ? OR recipes.description LIKE ?)
			ORDER BY recipes.name ASC
			LIMIT ? OFFSET ?`,
		[meatType, `%${searchTerm}%`, `%${searchTerm}%`, ITEM_PER_PAGE, offset]
	);

	return { recipes: rows, total_recipes, total_pages }; // Return the recipes and pagination info
};
