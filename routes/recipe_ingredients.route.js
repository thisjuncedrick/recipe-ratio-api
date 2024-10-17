import express from 'express';
import { getIngredientsForRecipe } from '../controllers/index.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = express.Router();

/**
 * Route to fetch ingredients for a specific recipe by ID.
 *
 * This endpoint retrieves the ingredients required for the recipe
 * identified by the given recipe ID in the URL parameter.
 *
 * @route GET /recipe/ingredients/:id
 * @param {string} id - The ID of the recipe for which to retrieve ingredients.
 *
 * @returns {Object} An object containing the ingredients for the specified recipe.
 */
router.get(
	'/recipe/ingredients/:id',
	asyncHandler(async (req, res) => {
		const id = req.params.id; // Retrieve the recipe ID from the URL parameters.
		const ingredients = await getIngredientsForRecipe(id); // Fetch ingredients for the specified recipe.
		res.send({ ingredients }); // Send the ingredients as a response.
	})
);

export default router;
