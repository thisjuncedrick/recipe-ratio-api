import express from 'express';
import { getDirectionsForRecipe } from '../controllers/index.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = express.Router();

/**
 * Route to fetch directions for a specific recipe by ID.
 *
 * This endpoint retrieves the cooking directions for the recipe
 * identified by the given recipe ID in the URL parameter.
 *
 * @route GET /recipe/directions/:id
 * @param {string} id - The ID of the recipe for which to retrieve directions.
 *
 * @returns {Object} An object containing the directions for the specified recipe.
 */
router.get(
	'/recipe/directions/:id',
	asyncHandler(async (req, res) => {
		const id = req.params.id; // Retrieve the recipe ID from the URL parameters.
		const directions = await getDirectionsForRecipe(id); // Fetch directions for the specified recipe.
		res.send({ directions }); // Send the directions as a response.
	})
);

export default router;
