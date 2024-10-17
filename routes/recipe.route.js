import express from 'express';
import {
	getDirectionsForRecipe,
	getIngredientsForRecipe,
	getRecipe,
	getRecipeMeatTypes,
} from '../controllers/index.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = express.Router();

/**
 * Route to fetch the details of a specific recipe by ID.
 *
 * This endpoint retrieves recipe details for the specified recipe ID.
 * Optionally, additional information can be included in the response
 * by using the ?append query parameter with values of 'ingredients',
 * 'directions', or 'meats'.
 *
 * @route GET /recipe/:id
 * @param {string} id - The ID of the recipe to retrieve.
 * @query {string} append - Comma-separated values specifying which additional
 *                          details to include (e.g., 'ingredients', 'directions', 'meats').
 *
 * @returns {Object} An object containing the recipe details, optionally
 *                   including ingredients, directions, and meat types.
 * @throws {404} If no recipe is found with the specified ID.
 */
router.get(
	'/recipe/:id',
	asyncHandler(async (req, res) => {
		const id = req.params.id; // Retrieve the recipe ID from the URL parameters.
		const append = req.query.append ? req.query.append.split(',') : []; // Split the append query parameter into an array.

		let response = await getRecipe(id); // Fetch the recipe details.

		// Check if the recipe exists.
		if (!response || response.length === 0) {
			return res.status(404).json({ error: 'No recipe with that id' }); // Return a 404 error if not found.
		}

		// Conditionally append ingredients, directions, or meat types based on the append query.
		if (append.includes('ingredients')) {
			const ingredients = await getIngredientsForRecipe(id); // Fetch ingredients for the recipe.
			response[0].ingredients = ingredients; // Append ingredients to the recipe response.
		}

		if (append.includes('directions')) {
			const directions = await getDirectionsForRecipe(id); // Fetch directions for the recipe.
			response[0].directions = directions; // Append directions to the recipe response.
		}

		if (append.includes('meats')) {
			const meat_types = await getRecipeMeatTypes(id); // Fetch meat types for the recipe.
			response[0].meat_types = meat_types; // Append meat types to the recipe response.
		}

		res.json({ recipe: response }); // Send the complete recipe response.
	})
);

export default router;
