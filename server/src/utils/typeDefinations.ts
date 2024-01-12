export type ErrorResponseType = {
  statusCode?: number;
  errorCode: string;
  errorMessage: string;
};

export type successResponseType = {
  statusCode?: number;
  message?: string;
  data?: any;
};

export type ErrorMap = {
  [key: string]: ErrorResponseType;
};
