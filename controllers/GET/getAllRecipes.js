import { POOL, ITEM_PER_PAGE, CAPITALIZE_WORDS } from '../constants.js';

/**
 * Fetches all recipes from the database with optional pagination.
 *
 * This function retrieves a list of recipes, including their associated meat types,
 * and supports pagination to limit the number of recipes returned in a single request.
 *
 * @param {number} [page=1] - The page number to retrieve, defaults to 1.
 * @returns {Object} An object containing the current page, the list of formatted recipes,
 *                   total number of recipes, and total pages available.
 * @throws {Error} If the database query fails.
 */
export const getAllRecipes = async (page = 1) => {
	const offset = (page - 1) * ITEM_PER_PAGE; // Calculate the offset for pagination

	const [rows] = await POOL.query(
		`
		SELECT recipes.*, GROUP_CONCAT(meat_types.name) AS meat_types
		FROM recipes
		LEFT JOIN recipe_meat_types ON recipes.id = recipe_meat_types.recipe_id
		LEFT JOIN meat_types ON recipe_meat_types.meat_id = meat_types.id
		GROUP BY recipes.id
		ORDER BY recipes.name ASC
		LIMIT ? OFFSET ?
		`,
		[ITEM_PER_PAGE, offset]
	);

	// Format the meat_types as an array
	const formattedRows = rows.map((row) => ({
		...row,
		meat_types: row.meat_types
			? row.meat_types.split(',').map((meat) => CAPITALIZE_WORDS(meat.trim()))
			: [],
	}));

	// Get the total count of recipes for calculating total pages
	const [[{ total_recipes }]] = await POOL.query(`
		SELECT COUNT(*) AS total_recipes FROM recipes
	`);

	const total_pages = Math.ceil(total_recipes / ITEM_PER_PAGE); // Calculate total pages

	// Return the formatted structure similar to getAllRecipesWithMeat
	return {
		page, // Current page number
		recipes: formattedRows,
		total_pages, // Total number of pages
		total_recipes, // Total number of recipes
	};
};
