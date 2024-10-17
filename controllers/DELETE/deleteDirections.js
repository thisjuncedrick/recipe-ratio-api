import { POOL } from '../constants.js';

export const deleteDirections = async (recipe_id) => {
	const [result] = await POOL.execute('DELETE FROM `directions` WHERE recipe_id = ?', [recipe_id]);
	return result;
};
