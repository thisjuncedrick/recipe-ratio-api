import express from 'express';
import { getAllRecipes } from '../controllers/index.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = express.Router();

/**
 * Route to fetch all available recipes with pagination.
 *
 * This endpoint retrieves a list of all recipes, supporting pagination
 * to limit the number of recipes returned per request.
 *
 * @route GET /recipes
 * @query {number} page - The page number to retrieve, defaults to 1 if not provided.
 *
 * @returns {Object} An object containing the current page, the list of recipes,
 *                   total number of recipes, and total pages available.
 */
router.get(
	'/recipes',
	asyncHandler(async (req, res) => {
		const page = parseInt(req.query.page) || 1; // Retrieve the page number from the query parameter, defaulting to 1.
		const { recipes, total_recipes, total_pages } = await getAllRecipes(page); // Fetch all recipes with pagination.

		res.send({ page, recipes, total_pages, total_recipes }); // Send the response containing pagination info and recipes.
	})
);

export default router;
