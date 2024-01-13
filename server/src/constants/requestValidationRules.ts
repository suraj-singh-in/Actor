import { ValidationRules, validationRulesMap } from "../utils/typeDefinations";

/**
 * Represents the validation rules for creating a theater request.
 * @typedef {Object} CreateTheaterRequestRule
 * @property {string} name - The required string property for the theater name.
 * @property {string} logo - The optional string property for the theater logo.
 * @property {string[]} permissions - The optional array property for theater permissions.
 * @property {string} permissions.* - Each item in the permissions array is a required string.
 */
const createTheaterRequestRule: ValidationRules = {
  name: "required|string",
  logo: "string",
  permissions: "array",
  "permissions.*": "string|required",
};

/**
 * Validation rules for creating an Act request.
 * @type {ValidationRules}
 */
const createActRequestRule: ValidationRules = {
  name: "required|string",
  endPoint: "required|string",
  theaterId: "required|string",
  method: "required|string",
  verses: "required|array",
  "verses.*.name": "string|required",
  "verses.*.response": "string|required",
  "verses.*.httpCode": "required|numeric",
  "verses.*.responseType": "string|required",
  "verses.*.isActive": "boolean",
};

/**
 * Validation rules for changing the active verse in an Act request.
 * @type {ValidationRules}
 */
const changeActiveVerseRequestRule: ValidationRules = {
  actId: "required|string",
  verseId: "required|string",
};

/**
 * Validation rules for registering a new user request.
 * @type {ValidationRules}
 */
const registerUserRequestRule: ValidationRules = {
  userName: "required|string",
  name: "required|string",
  password: "required|string",
};

/**
 * Validation rules for logging in a user request.
 * @type {ValidationRules}
 */
const loginUserRequestRule: ValidationRules = {
  userName: "required|string",
  password: "required|string",
};

/**
 * Validation rules map for Theater-realted requests.
 * @type {Object} TheaterValidationRule
 */
const TheaterValidationRule: validationRulesMap = {
  createTheaterRequestRule: createTheaterRequestRule,
};

/**
 * Validation rules map for Act-related requests.
 * @type {ValidationRulesMap}
 */
const ActValidationRule: validationRulesMap = {
  createActRequestRule: createActRequestRule,
  changeActiveVerseRequestRule: changeActiveVerseRequestRule,
};

/**
 * Validation rules map for authentication-related requests.
 * @type {ValidationRulesMap}
 */
const AuthValidationRule: validationRulesMap = {
  registerUserRequestRule: registerUserRequestRule,
  loginUserRequestRule: loginUserRequestRule,
};

export { TheaterValidationRule, ActValidationRule, AuthValidationRule };
