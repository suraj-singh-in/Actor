/**
 * Joins any number of arguments into a single string separated by commas.
 * If an argument is an object, it will be converted to JSON string format.
 * @param {...any} args - Any number of arguments to be joined.
 * @returns {string} - A string joined by commas.
 */
export const loggerString = (...args: any[]): string => {
  return args
    .map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : arg))
    .join(": ");
};
