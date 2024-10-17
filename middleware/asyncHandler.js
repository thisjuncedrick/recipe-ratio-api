/**
 * Middleware to handle asynchronous route handlers.
 *
 * This utility function wraps an asynchronous route handler and catches any errors
 * that may occur during its execution. If an error is caught, it is passed to the
 * next middleware in the stack, allowing for centralized error handling.
 *
 * @param {Function} fn - The asynchronous function (route handler) to be wrapped.
 * @returns {Function} A new function that takes `req`, `res`, and `next` as arguments.
 *                    This function executes the provided handler and manages errors.
 */
export const asyncHandler = (fn) => async (req, res, next) => {
	try {
		await fn(req, res, next);
	} catch (error) {
		next(error); // Pass the error to the next middleware for handling
	}
};
