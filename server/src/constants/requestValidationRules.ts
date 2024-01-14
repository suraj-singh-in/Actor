import { ValidationRules, validationRulesMap } from "../utils/typeDefinations";

/**
 * Represents the validation rules for creating a theater request.
 * @typedef {Object} CreateTheaterRequestRule
 * @property {string} name - The required string property for the theater name.
 * @property {string} logo - The optional string property for the theater logo.
 * @property {string[]} viewerList - The optional array property for viewer list permissions.
 * @property {string[]} editorList - The optional array property for editor list permissions.
 * @property {string} isAdminTheater - The required boolean property indicating admin property.
 */
const createTheaterRequestRule: ValidationRules = {
  name: "required|string",
  logo: "string",
  isAdminTheater: "required|boolean",
  viewerList: "array",
  "viewerList.*": "string|required",
  editorList: "array",
  "editorList.*": "string|required",
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
  roleList: "array",
  "roleList.*": "required|string",
};

const editViewerOrEditorListRequestRule: ValidationRules = {
  theaterId: "required|string",
  userId: "required|string",
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
  editViewerOrEditorListRequestRule: editViewerOrEditorListRequestRule,
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
