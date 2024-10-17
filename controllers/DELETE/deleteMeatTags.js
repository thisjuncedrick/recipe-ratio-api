import { POOL } from '../constants.js';

export const deleteMeatTags = async (recipe_id) => {
	const [result] = await POOL.execute('DELETE FROM recipe_meat_types WHERE recipe_id = ?', [
		recipe_id,
	]);
	return result;
};
