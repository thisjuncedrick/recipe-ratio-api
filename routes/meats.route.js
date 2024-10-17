import express from 'express';
import { getMeatTypes } from '../controllers/index.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = express.Router();

/**
 * Route to fetch all meat types from the database.
 *
 * This endpoint retrieves a list of all available meat types stored in the database.
 *
 * @route GET /meats
 *
 * @returns {Array} An array of meat type objects.
 */
router.get(
	'/meats',
	asyncHandler(async (req, res) => {
		const meats = await getMeatTypes(); // Fetch all meat types from the database.
		res.send(meats); // Send the list of meat types as a response.
	})
);

export default router;
