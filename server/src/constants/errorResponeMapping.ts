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

const CREATE_ACT_ERROR: ErrorResponseType = {
  statusCode: 500,
  errorCode: "ACT-ERROR-0002",
  errorMessage: "Error while creating an Act",
};

const ACT_ALREADY_EXISTS_ERROR: ErrorResponseType = {
  statusCode: 500,
  errorCode: "ACT-ERROR-0003",
  errorMessage: "Act Already Exists",
};

const MORE_THAN_ONE_ACTIVE_VERSE_ERROR: ErrorResponseType = {
  statusCode: 500,
  errorCode: "ACT-ERROR-0004",
  errorMessage: "Exactly one Active Verse is allowed",
};

const NO_USER_FOUND: ErrorResponseType = {
  statusCode: 401,
  errorCode: "AUTH-ERROR-0001",
  errorMessage: "No User found",
};

const WRONG_PASSWORD: ErrorResponseType = {
  statusCode: 401,
  errorCode: "AUTH-ERROR-0002",
  errorMessage: "Wrong password",
};

export const AUTH_ERROR: ErrorMap = {
  NO_USER_FOUND: NO_USER_FOUND,
  WRONG_PASSWORD: WRONG_PASSWORD,
};

export const ACTS_ERROR: ErrorMap = {
  CREATE_ACT_ERROR: CREATE_ACT_ERROR,
  ACT_ALREADY_EXISTS_ERROR: ACT_ALREADY_EXISTS_ERROR,
  MORE_THAN_ONE_ACTIVE_VERSE_ERROR: MORE_THAN_ONE_ACTIVE_VERSE_ERROR,
};

export const genericActError = (errorMessage: string): ErrorResponseType => {
  return {
    statusCode: 500,
    errorCode: "ACT-ERROR-0001",
    errorMessage: errorMessage,
  };
};
