import { ErrorMap, ErrorResponseType } from "../utils/typeDefinations";

const INTERNAL_SERVER_ERROR: ErrorResponseType = {
  statusCode: 500,
  errorCode: "ERROR-0001",
  errorMessage: "Something went wrong, please try again after some time",
};

const GENERIC_ERRORS: ErrorMap = {
  INTERNAL_SERVER_ERROR: INTERNAL_SERVER_ERROR,
};

export { GENERIC_ERRORS };
