import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

/**
 * MySQL connection pool for the application.
 *
 * The pool allows multiple connections to the MySQL database, which can improve performance
 * by reusing existing connections instead of creating a new one for each request.
 *
 * Connection parameters are loaded from environment variables for security and flexibility.
 *
 * @constant {mysql.Pool} POOL - A connection pool instance to interact with the MySQL database.
 */
export const POOL = mysql
	.createPool({
		host: process.env.MYSQL_HOST, // Database host from environment variables
		user: process.env.MYSQL_USER, // Database user from environment variables
		password: process.env.MYSQL_PASSWORD, // Database password from environment variables
		database: process.env.MYSQL_DATABASE, // Database name from environment variables
	})
	.promise(); // Use promise-based API for async/await support

/**
 * Capitalizes the first letter of each word in a given string.
 *
 * @param {string} str - The input string to capitalize.
 * @returns {string} The input string with each word's first letter capitalized.
 */
export const CAPITALIZE_WORDS = (str) => {
	return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

/**
 * The number of items to display per page in paginated responses.
 * This value is used for pagination in API responses.
 *
 * @constant
 * @type {number}
 */
export const ITEM_PER_PAGE = 5;
