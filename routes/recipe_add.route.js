import express from 'express';
import {
	POOL,
	postDirections,
	postIngredients,
	postMeatTags,
	postRecipeDetails,
} from '../controllers/index.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = express.Router();

/**
 * Creates a new recipe and its associated details in the database.
 *
 * This route handles POST requests to the `/recipe` endpoint. It
 * extracts recipe details from the request body, including the recipe's
 * name, description, cover image, ingredients, directions, and meat types.
 * The function sequentially calls other functions to store the recipe and
 * its related information in the database. Finally, it returns the ID of
 * the newly created recipe to the client.
 *
 * @async
 * @function post
 * @route POST /recipe
 * @group Recipe - Operations about recipes
 * @param {Object} request.body - The recipe details.
 * @param {string} request.body.name - The recipe's name.
 * @param {string} request.body.description - The recipe's description.
 * @param {string} request.body.cover_image - The recipe's cover image URL.
 * @param {Array<Object>} request.body.ingredients - The ingredients for the recipe.
 * @param {Array<Object>} request.body.directions - The directions for the recipe.
 * @param {Array<Object>} request.body.meat_type - The associated meat types.
 * @returns {Object} 200 - An object indicating success and the ID of the newly created recipe.
 * @throws {Error} 500 - If there is an error processing the request.
 */
router.post(
	'/recipe',
	asyncHandler(async (req, res) => {
		const { name, description, cover_image, ingredients, directions, meat_type } = req.body;

		try {
			await POOL.query('START TRANSACTION');

			const { last_inserted_id } = await postRecipeDetails(name, description, cover_image);
			await postIngredients(last_inserted_id, ingredients);
			await postDirections(last_inserted_id, directions);
			await postMeatTags(last_inserted_id, meat_type);

			await POOL.query('COMMIT');

			res.status(201).json({
				success: true,
				message: 'Recipe and associated data created successfully',
				recipeId: last_inserted_id,
			});
		} catch (error) {
			await POOL.query('ROLLBACK');
			console.error('Error creating recipe:', error);
			res.status(500).json({
				success: false,
				message: 'An error occurred while creating the recipe',
				error: error.message,
			});
		}
	})
);

export default router;
