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

const changeActiveVerseRequestRule: ValidationRules = {
  actId: "required|string",
  verseId: "required|string",
};

/**
 * Represents a collection of theater validation rules.
 * @typedef {Object} TheaterValidationRule
 * @property {CreateTheaterRequestRule} createTheaterRequestRule - The validation rules for creating a theater.
 */
const TheaterValidationRule: validationRulesMap = {
  createTheaterRequestRule: createTheaterRequestRule,
};

const ActValidationRule: validationRulesMap = {
  createActRequestRule: createActRequestRule,
  changeActiveVerseRequestRule: changeActiveVerseRequestRule,
};

export { TheaterValidationRule, ActValidationRule };
