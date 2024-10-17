import { POOL } from '../constants.js';

export const deleteIngredients = async (recipe_id) => {
	const [result] = await POOL.execute('DELETE FROM `ingredients` WHERE recipe_id = ?', [
		recipe_id,
	]);
	return result;
};
