import express from 'express';
import { getRecipeMeatTypes } from '../controllers/index.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = express.Router();

/**
 * Route to fetch the meat types associated with a specific recipe by ID.
 *
 * This endpoint retrieves the meat type(s) for the recipe identified
 * by the given recipe ID in the URL parameter.
 *
 * @route GET /recipe/meats/:id
 * @param {string} id - The ID of the recipe for which to retrieve meat types.
 *
 * @returns {Object} An object containing the meat types associated with the specified recipe.
 */
router.get(
	'/recipe/meats/:id',
	asyncHandler(async (req, res) => {
		const id = req.params.id; // Retrieve the recipe ID from the URL parameters.
		const meat_types = await getRecipeMeatTypes(id); // Fetch meat types for the specified recipe.
		res.send({ meat_types }); // Send the meat types as a response.
	})
);

export default router;
