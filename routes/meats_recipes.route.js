import express from 'express';
import { getAllRecipesWithMeat } from '../controllers/index.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = express.Router();

/**
 * Route to fetch all recipes for a specific meat type with an optional search term.
 * @route GET /meat/recipes/:meat
 * @param {string} meat - The name of the meat type.
 * @query {string} search - The search term for recipe names or descriptions.
 * @query {number} page - The page number for pagination.
 */
router.get(
	'/meat/recipes/:meat',
	asyncHandler(async (req, res) => {
		const meatType = req.params.meat; // Get the meat type from the URL parameter
		const searchTerm = req.query.search || ''; // Get the search term from the query, default to empty string
		const page = parseInt(req.query.page) || 1; // Get the page number from the query, default to 1

		const { recipes, total_recipes, total_pages } = await getAllRecipesWithMeat(
			meatType,
			searchTerm,
			page
		);

		res.json({ page, recipes, total_recipes, total_pages });
	})
);

export default router;
