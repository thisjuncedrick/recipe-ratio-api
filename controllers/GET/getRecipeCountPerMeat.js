import { CAPITALIZE_WORDS, POOL } from '../constants.js';

export const getRecipeCountPerMeat = async () => {
	const [result] = await POOL.query(
		`SELECT 
			meat_types.id,
			meat_types.name,
			COUNT(recipe_meat_types.recipe_id) AS total_recipes
		FROM 
			meat_types
		LEFT JOIN 
			recipe_meat_types ON meat_types.id = recipe_meat_types.meat_id
		GROUP BY 
			meat_types.name ORDER BY meat_types.id ASC`
	);

	const formatCount = result.map((meat) => ({
		...meat,
		name: CAPITALIZE_WORDS(meat.name),
	}));

	return formatCount;
};
