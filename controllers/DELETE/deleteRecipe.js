import { POOL } from '../constants.js';

export const deleteRecipe = async (recipe_id) => {
	const [result] = await POOL.execute('DELETE FROM `recipes` WHERE id = ?', [recipe_id]);
	return result;
};
