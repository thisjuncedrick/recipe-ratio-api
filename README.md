![Logo](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAA0RJREFUeF7tmr9rFEEUx99cYaE2KoiNjVWa2xMkTdBKJPkHNHvpLIKSSrP+F7qKhehhrWzAziZwdnoJQghkr9K/wIA/Ck2wysgIK+dlZt6bN3t3+ytt3sy87+d9583sJAJq/iNqrh8aAI0Dak6g2QI1NwC/CSZp/BMATmMAwyAqtMuck0vSWGKidb8vKggnAFzxo0CKBoIEIEnjAQAscCpfdDegAF4PHwYt2drLS3w2T1GcgALIw/YmeEWAYAVAEf/0cwrbX/ePaUwWbuCmkbAWdqLneODkIowA3u70Th6c+HVgWvpISljZfodmhoGYtQuMAGzVv7c7gC+/D1HxWYANghRivtte3yFPlnMgC0C41XdOwwaB4gLKduScOFoAG8P4vZRwVTshQ7yaZ/7seYjmOlpwGACu+JHFvodBdE63uBaAbUFO9SlbwdlSjgNMkJ0AhFt9dQ02bZsfAHDGlhfWEB01OYfrIOQJAE2o/AAGfXP9UfkApQfw8ds+PPmUEqTqQ0oPQMmqRRNUQk0nAReAzz3A9xi0HbOluQjZiuLzscUC4LoVfKrPbjjEgV5fg5TtgDU+7BZI1MEO8wKQrToOYvHCRbh9aQ5NatbiVYLNgwhaJsuJQBnr06C0Y3tLL+HO5qrP2qNjUQf8+5BhPofrEmVb/8XS/0/ydzfJ+ZuAOU3gex7LIwi7l6MNVvXGxatJpg3Axw3sqmeLFgmAA4jHYRBFxorrRLHsQRhkcIvTFiAsQw/pLa6AFK/oA3KI1ECYHQClZ5oOMPSM+gDw2QLs7i9bV8LO/V2KedlrIJNjzRd1QB6JtQSEt9r24y+PdTh3jqkAUIlhlagUACU2SWP1d7Pro1WxQagcAN1doQFg+X+hSjpgXFRtHKDrxkLAh+V2dM10alXKAZzjqLIAsOPP4cOKcp86FoOtP5F7ALaoTklhHaCSdUlOSnmz23nwxrVcLmu4zI0VA3XAXwDDR89AijVsYQHicDlYP4XFlc4BHEGuYwrtAFcxnPgGQI6vztTvDxVn7gF5v9YgL7iTcADWAM0A8haflWTKEEoHwPXItfUainj7FuB0shKOId0DSqiLnHIDgIyqooGNAypaWLKs2jvgD/rXiVDQA2MhAAAAAElFTkSuQmCC)

# Recipe Ratio API

This API provides access to recipe data, including details about recipes, ingredients, directions, and the associated meat types. Pagination and search functionalities are also supported. Below is the documentation for the available routes, parameters, and expected outputs.

## Table of Contents

-  [API Overview](#api-overview)
-  [Environment Setup](#environment-setup)
-  [Available Routes](#available-routes)
   -  [Meat Types](#meat-types)
   -  [Recipes](#recipes)
   -  [Recipe by ID](#recipe-by-id)
   -  [Recipe Ingredients](#recipe-ingredients)
   -  [Recipe Directions](#recipe-directions)
   -  [Recipe Meat Types](#recipe-meat-types)
   -  [Search Recipes](#search-recipes)
   -  [Add a New Recipe](#add-a-new-recipe)
   -  [Delete a Recipe](#delete-recipe)
-  [Error Handling](#error-handling)

---

<div id="api-overview"/>

## API Overview

The Recipe API allows you to:

-  Fetch meat types.
-  Fetch all recipes or those associated with a specific meat type.
-  Search for recipes by name or description.
-  Fetch detailed information about a specific recipe.
-  Retrieve recipe ingredients, directions, and associated meat types.

<div id="environment-setup"/>

## Environment Setup

Make sure to create a `.env` file in your project root with the following variables:

```bash
  MYSQL_HOST=your_database_host
  MYSQL_USER=your_database_user
  MYSQL_PASSWORD=your_database_password
  MYSQL_DATABASE=your_database_name
```

### Install Dependencies

```bash
  npm install
```

### Start server

The server uses two ways to start the API server, using Nodemon or Node. Make sure to run the following commands on the root folder.

##### Start with Nodemon

```bash
  npm run dev
```

##### Start with Node.js

```bash
  node app.js
```

This will start the server on `http://localhost:8080`.

---

<div id="available-routes"/>

## Available Routes

<div id="meat-types"/>

### Fetch Available Meat Types

Endpoint that retrieves a list of all available meat types stored in the database.

#### Usage

```http
  GET /meats
```

#### Example Response

```json
[
	{
		"id": 1,
		"name": "Chicken"
	},
	{
		"id": 2,
		"name": "Pork"
	},
	{
		"id": 3,
		"name": "Beef"
	},
	{
		"id": 4,
		"name": "Fish"
	}
]
```

<div id="recipes"/>

### Fetch all available recipes

Endpoint that retrieves certain number of recipes available in database. Page defaults to `1`

#### Usage

```http
  GET /recipes?page=${page}
```

| Parameter | Type     | Description                              |
| :-------- | :------- | :--------------------------------------- |
| `page`    | `number` | Page number for pagination (_optional_). |

#### Example Response

```json
{
	"page": 1,
	"recipes": [
		{
			"id": 1,
			"name": "BBQ Chicken",
			"description": "A delicious BBQ chicken recipe.",
			"cover_image": "https://example.com/bbq-chicken.jpg",
			"date_created": "2024-10-04T05:40:52.000Z",
			"meat_types": ["Chicken"]
		}
	],
	"total_pages": 2,
	"total_recipes": 15
}
```

<div id="recipe-by-id"/>

### Fetch recipe detail by ID

Endpoint that retrieves the details of a certain recipe via its `id`

#### Usage

```http
  GET /recipe/${id}
```

| Parameter | Type     | Description                         |
| :-------- | :------- | :---------------------------------- |
| `id`      | `string` | **Required**. The ID of the recipe. |

#### Example Response

```json
{
	"recipe": [
		{
			"id": 1,
			"name": "BBQ Chicken",
			"description": "A delicious BBQ chicken recipe.",
			"cover_image": "https://example.com/bbq-chicken.jpg",
			"date_created": "2024-10-04T05:40:52.000Z",
			"meat_types": ["Chicken"]
		}
	]
}
```

<div id="recipe-ingredients"/>

### Fetch ingredients of a recipe

This endpoint retrieves the ingredients required for the recipe identified by the given recipe ID in the URL parameter.

#### Usage

```http
  GET /recipe/ingredients/${id}
```

| Parameter | Type     | Description                         |
| :-------- | :------- | :---------------------------------- |
| `id`      | `string` | **Required**. The ID of the recipe. |

#### Example Response

```json
{
	"ingredients": [
		{
			"name": "Chicken",
			"quantity": 1,
			"unit": "kg"
		},
		{
			"name": "BBQ Sauce",
			"quantity": 200,
			"unit": "ml"
		}
	]
}
```

<div id="recipe-directions"/>

### Fetch directions of a recipe

This endpoint retrieves the cooking directions for the recipe identified by the given recipe ID in the URL parameter.

#### Usage

```http
  GET /recipe/directions/${id}
```

| Parameter | Type     | Description                         |
| :-------- | :------- | :---------------------------------- |
| `id`      | `string` | **Required**. The ID of the recipe. |

#### Example Response

```json
{
	"directions": [
		{
			"description": "Marinate the chicken with BBQ sauce for 2 hours.",
			"duration": 2,
			"duration_unit": "hr"
		},
		{
			"description": "Grill the chicken until fully cooked.",
			"duration": null,
			"duration_unit": null
		}
	]
}
```

<div id="recipe-meat-types"/>

### Fetch associated meat types for a recipe

This endpoint retrieves the meat type(s) for the recipe identified by the given recipe ID in the URL parameter.

#### Usage

```http
  GET /recipe/meats/${id}
```

| Parameter | Type     | Description                         |
| :-------- | :------- | :---------------------------------- |
| `id`      | `string` | **Required**. The ID of the recipe. |

#### Example Response

```json
{
	"meat_types": [
		{
			"id": 1,
			"name": "Chicken"
		}
	]
}
```

<div id="search-recipes"/>

### Fetch Recipes by Meat Type

This endpoint fetches all available recipe under certain `meatType` with optional pagination and searching

##### Usage

```http
  GET /meat/recipes/${meatType}?page=${page}&search=${search}
```

| Parameter    | Type     | Description                                             |
| :----------- | :------- | :------------------------------------------------------ |
| `meatType`   | `string` | **Required**. The name of the meat.                     |
| `searchTerm` | `string` | Search term to filter recipes (_optional_).             |
| `page`       | `number` | Page number for pagination (_optional_). Default to `1` |

#### Example Response

```json
{
	"page": 1,
	"recipes": [
		{
			"id": 1,
			"name": "BBQ Chicken",
			"description": "A delicious BBQ chicken recipe.",
			"cover_image": "https://example.com/bbq-chicken.jpg",
			"date_created": "2024-10-04T05:40:52.000Z",
			"meat_types": ["Chicken"]
		}
	],
	"total_recipes": 15,
	"total_pages": 2
}
```

<div id="add-a-new-recipe"/>

### Add recipe to the Database

This endpoint accepts a request body containing recipe details, including name, description, cover image, ingredients, directions, and meat types. It saves the recipe and its related information to the database and returns the ID of the newly created recipe.

##### Usage

```http
  POST /recipes
```

#### Request Body

The request body should be in JSON format and contain the following fields:

| Field Name    | Type            | Description                                       |
| ------------- | --------------- | ------------------------------------------------- |
| `name`        | `string`        | The name of the recipe.                           |
| `description` | `string`        | A short description of the recipe.                |
| `cover_image` | `string`        | URL of the recipe's cover image.                  |
| `ingredients` | `Array<Object>` | List of ingredients for the recipe.               |
| `directions`  | `Array<Object>` | Step-by-step directions for preparing the recipe. |
| `meat_type`   | `Array<Object>` | Meat types associated with the recipe.            |

#### Example Request

```json
{
	"name": "BBQ Chicken",
	"description": "A delicious BBQ chicken recipe.",
	"cover_image": "https://example.com/bbq-chicken.jpg",
	"ingredients": [
		{
			"name": "Chicken",
			"quantity": 1,
			"unit": "kg"
		},
		{
			"name": "BBQ Sauce",
			"quantity": 200,
			"unit": "ml"
		}
	],
	"directions": [
		{
			"description": "Marinate the chicken with BBQ sauce for 2 hours.",
			"duration": 2,
			"duration_unit": "hr"
		},
		{
			"description": "Grill the chicken until fully cooked.",
			"duration": null,
			"duration_unit": null
		}
	],
	"meat_type": [
		{
			"meat": "chicken"
		}
	]
}
```

#### Response

On success, the response will include the `recipeId` of the newly created recipe:

```json
{
	"success": true,
	"message": "Recipe and associated data created successfully",
	"recipeId": 1
}
```

#### Possible Errors

-  `500 Internal Server Error`: If there was an issue creating the recipe or inserting associated details.

<div id="delete-recipe"/>

### Delete a recipe from the database

This route handles `DELETE` requests to the `/recipe/:id` endpoint. It removes the recipe's details, ingredients, directions, and meat tags from the database based on the provided recipe ID.

#### URL Parameters

| Parameter | Type     | Description                                  |
| --------- | -------- | -------------------------------------------- |
| `id`      | `number` | **Required**. The ID of the recipe to delete |

#### Example Request

```
DELETE /recipe/1
```

#### Response

On success, the response will confirm the deletion and return the number of affected rows:

```json
{
	"success": true,
	"message": "Recipe and associated data deleted successfully",
	"affectedRows": 1
}
```

#### Possible Errors

-  `500 Internal Server Error`: If there was an issue deleting the recipe or its associated details.

---

<div id="error-handling"/>

## Error Handling

All endpoints will return a standardized error response when an error occurs.

#### Example Error Response

```json
{
	"success": false,
	"error": "Error message describing the issue."
}
```
