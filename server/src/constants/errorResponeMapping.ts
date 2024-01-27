import { ErrorMap, ErrorResponseType } from "../utils/typeDefinations";

/**
 * Represents an internal server error response.
 * @type {ErrorResponseType}
 * @property {number} statusCode - The HTTP status code for internal server error (500).
 * @property {string} errorCode - The error code associated with the internal server error.
 * @property {string} errorMessage - A descriptive error message for internal server error.
 */
export const INTERNAL_SERVER_ERROR: ErrorResponseType = {
  statusCode: 500,
  errorCode: "ERROR-0001",
  errorMessage: "Something went wrong, please try again after some time",
};

/**
 * Represents a bad request error response.
 * @type {ErrorResponseType}
 * @property {number} statusCode - The HTTP status code for bad request (500).
 * @property {string} errorCode - The error code associated with the bad request error.
 * @property {string} errorMessage - A descriptive error message for bad request.
 */
export const BAD_REQUEST_ERROR: ErrorResponseType = {
  statusCode: 500,
  errorCode: "ERROR-0002",
  errorMessage: "Bad Request",
};

export const UNAUTHORIZED: ErrorResponseType = {
  statusCode: 401,
  errorCode: "ERROR-0003",
  errorMessage: "You are not authorized to access this resource.",
};

/**
 * Error response for the scenario when an error occurs while creating an Act.
 * @type {ErrorResponseType}
 */
const CREATE_ACT_ERROR: ErrorResponseType = {
  statusCode: 500,
  errorCode: "ACT-ERROR-0002",
  errorMessage: "Error while creating an Act",
};

/**
 * Error response for the scenario when an attempt is made to create an Act that already exists.
 * @type {ErrorResponseType}
 */
const ACT_ALREADY_EXISTS_ERROR: ErrorResponseType = {
  statusCode: 500,
  errorCode: "ACT-ERROR-0003",
  errorMessage: "Act Already Exists",
};

/**
 * Error response for the scenario when more than one Active Verse is detected, which is not allowed.
 * @type {ErrorResponseType}
 */
const MORE_THAN_ONE_ACTIVE_VERSE_ERROR: ErrorResponseType = {
  statusCode: 500,
  errorCode: "ACT-ERROR-0004",
  errorMessage: "Exactly one Active Verse is allowed",
};

/**
 * Error response for the scenario when no user is found during authentication.
 * @type {ErrorResponseType}
 */
const NO_USER_FOUND: ErrorResponseType = {
  statusCode: 401,
  errorCode: "AUTH-ERROR-0001",
  errorMessage: "No User found",
};

/**
 * Error response for the scenario when an incorrect password is provided during authentication.
 * @type {ErrorResponseType}
 */
const WRONG_PASSWORD: ErrorResponseType = {
  statusCode: 401,
  errorCode: "AUTH-ERROR-0002",
  errorMessage: "Wrong password",
};

/**
 * Error response for the scenario when user name already exists.
 * @type {ErrorResponseType}
 */
const AUTH_USER_ALERADY_EXISTS: ErrorResponseType = {
  statusCode: 401,
  errorCode: "AUTH-ERROR-0003",
  errorMessage: "User Already Exists",
};

const NOT_ADMIN_USER: ErrorResponseType = {
  statusCode: 401,
  errorCode: "AUTH-ERROR-0004",
  errorMessage: "User is not admin.",
};

const THEATER_NOT_FOUND: ErrorResponseType = {
  statusCode: 401,
  errorCode: "THEATER-ERROR-0001",
  errorMessage: "No Theater Exist for given Theater ID",
};

const USER_ALREADY_IN_LIST: ErrorResponseType = {
  statusCode: 500,
  errorCode: "THEATER-ERROR-0002",
  errorMessage: "User Already Exist in the list",
};

const THEATER_ALREADY_CLONED: ErrorResponseType = {
  statusCode: 500,
  errorCode: "THEATER-ERROR-0003",
  errorMessage: "Theater Already cloned",
};

/**
 * Map containing authentication-related errors.
 * @type {ErrorMap}
 */
export const AUTH_ERROR: ErrorMap = {
  NO_USER_FOUND: NO_USER_FOUND,
  WRONG_PASSWORD: WRONG_PASSWORD,
  AUTH_USER_ALERADY_EXISTS: AUTH_USER_ALERADY_EXISTS,
  NOT_ADMIN_USER: NOT_ADMIN_USER,
};

/**
 * Map containing Act-related errors.
 * @type {ErrorMap}
 */
export const ACTS_ERROR: ErrorMap = {
  CREATE_ACT_ERROR: CREATE_ACT_ERROR,
  ACT_ALREADY_EXISTS_ERROR: ACT_ALREADY_EXISTS_ERROR,
  MORE_THAN_ONE_ACTIVE_VERSE_ERROR: MORE_THAN_ONE_ACTIVE_VERSE_ERROR,
};

export const THEATER_ERROR: ErrorMap = {
  THEATER_NOT_FOUND: THEATER_NOT_FOUND,
  USER_ALREADY_IN_LIST: USER_ALREADY_IN_LIST,
  THEATER_ALREADY_CLONED: THEATER_ALREADY_CLONED,
};

/**
 * Function to generate a generic Act-related error with a custom error message.
 * @param {string} errorMessage - The custom error message describing the issue.
 * @returns {ErrorResponseType} A generic Act-related error response.
 */
export const genericActError = (errorMessage: string): ErrorResponseType => {
  return {
    statusCode: 500,
    errorCode: "ACT-ERROR-0001",
    errorMessage: errorMessage,
  };
};
