import express from 'express';
import { getRecipeCountPerMeat } from '../controllers/index.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = express.Router();

router.get(
	'/meats/count',
	asyncHandler(async (req, res) => {
		const count = await getRecipeCountPerMeat();
		res.send(count);
	})
);

export default router;
