import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import * as routes from './routes/index.js';
import os from "os";

const app = express();
const PORT = 8080;

dotenv.config();

//* Function to get the local machine's IP address
const getLocalIPAddress = () => {
  const interfaces = os.networkInterfaces();
  for (const interfaceName in interfaces) {
    const addresses = interfaces[interfaceName];
    for (const addr of addresses) {
      // Check for IPv4 and internal=false, which excludes localhost
      if (addr.family === 'IPv4' && !addr.internal) {
        return addr.address;
      }
    }
  }
  return 'localhost';
};

const localIP = getLocalIPAddress();


//* Enable CORS for all routes
app.use(cors()); // Use CORS middleware

app.use(express.json()); // Middleware

//* Routes for fetching available meat types
/**
 * Route to fetch available meat types.
 * @route GET /meat
 */
app.use(routes.meats_route);

//* Routes for counting all recipe per meat
/**
 * Routes for counting all recipes available in each meat types
 * @route GET /meats/count
 */
app.use(routes.meat_recipe_counter);

//* Routes for fetching all recipes
/**
 * Route to fetch all recipes with pagination.
 * @route GET /recipes
 * @query {number} page - The page number for pagination.
 */
app.use(routes.recipes_route);

//* Route to get recipe information based on ID
/**
 * Route to fetch recipe information by ID.
 * @route GET /recipe/:id
 * @params {string} id - The ID of the recipe.
 * @params {string} append - Additional information to append: ingredients, directions, or meat types.
 */
app.use(routes.recipe_id_route);

//* Route to get recipe ingredients based on recipe ID
/**
 * Route to fetch ingredients of a recipe by ID.
 * @route GET /recipe/ingredients/:id
 * @params {string} id - The ID of the recipe.
 */
app.use(routes.recipe_ingredients);

//* Route to get recipe directions based on recipe ID
/**
 * Route to fetch directions of a recipe by ID.
 * @route GET /recipe/directions/:id
 * @params {string} id - The ID of the recipe.
 */
app.use(routes.recipe_directions);

//* Route to get the meat types associated with a recipe based on recipe ID
/**
 * Route to fetch meat types for a recipe by ID.
 * @route GET /recipe/meats/:id
 * @params {string} id - The ID of the recipe.
 */
app.use(routes.recipe_meats);

//* Route to get all recipes of a certain meat type by ID
/**
 * Route to fetch all recipes for a specific meat type.
 * @route GET /meat/recipes/:id
 * @params {string} id - The ID of the meat type.
 * @query {number} page - The page number for pagination.
 */
app.use(routes.meat_recipes);

//* Route to add a new recipe and its details
/**
 * Route to create a new recipe with its associated details.
 * @route POST /recipe
 * @body {string} name - The name of the recipe.
 * @body {string} description - The description of the recipe.
 * @body {string} cover_image - The cover image URL.
 * @body {Array<Object>} ingredients - The ingredients for the recipe.
 * @body {Array<Object>} directions - The directions for the recipe.
 * @body {Array<Object>} meat_type - The associated meat types.
 */
app.use(routes.add_recipe_route);

//* Route to delete a recipe and its details
/**
 * Route to delete a recipe and all its associated details.
 * @route DELETE /recipe/:id
 * @param {number} id - The ID of the recipe to delete.
 */
app.use(routes.delete_recipe);

//* Error handling middleware
/**
 * Error handling middleware to catch and respond to errors.
 * @param {Error} err - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ error: res.statusCode, message: err.message });
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running at:\n- \x1b[1m\x1b[4m\x1b[1m\x1b[34mhttp://localhost:${PORT}/\x1b[0m\n- \x1b[1m\x1b[4m\x1b[1m\x1b[34mhttp://${process.env.MYSQL_HOST}:${PORT}/\x1b[0m`);
	console.log('\nTry to navigate to \x1b[1m\x1b[34mmeats/\x1b[0m endpoint and check if the server returns valid JSON response, if it returns an error 500, check your MySQL server if it\'s open')
	console.log(`\n\x1b[91mIMPORTANT:\x1b[0m This is the URL you put on .env > EXPO_PUBLIC_SERVER_URL variable, on the app project: \x1b[1m\x1b[4m\x1b[1m\x1b[34mhttp://${localIP}:${PORT}/\x1b[0m`)
  


});
