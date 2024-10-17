import express from 'express';
import {
	deleteDirections,
	deleteIngredients,
	deleteMeatTags,
	deleteRecipe,
	POOL,
} from '../controllers/index.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = express.Router();

/**
 * Deletes a recipe and its associated details from the database.
 *
 * This route handles DELETE requests to the `/recipe/:id` endpoint. It
 * removes the recipe's details, ingredients, directions, and meat tags
 * from the database based on the provided recipe ID.
 *
 * @async
 * @function delete
 * @route DELETE /recipe/:id
 * @group Recipe - Operations about recipes
 * @param {number} request.params.id - The ID of the recipe to delete.
 * @returns {Object} 200 - An object indicating success and the number of affected rows.
 * @throws {Error} 500 - If there is an error processing the request.
 */
router.delete(
	'/recipe/:id',
	asyncHandler(async (req, res) => {
		const id = req.params.id;

		try {
			await POOL.query('START TRANSACTION');

			// Delete associated data first (to maintain referential integrity)
			await deleteIngredients(id);
			await deleteDirections(id);
			await deleteMeatTags(id);

			// Finally, delete the recipe details
			const result = await deleteRecipe(id);

			await POOL.query('COMMIT');

			res.json({
				success: true,
				message: 'Recipe and associated data deleted successfully',
				affectedRows: result.affectedRows,
			});
		} catch (error) {
			await POOL.query('ROLLBACK');
			throw error;
		}
	})
);

export default router;
