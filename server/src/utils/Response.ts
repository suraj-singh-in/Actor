import { ErrorResponseType, successResponseType } from "./typeDefinations";

class ErrorResponse {
  private statusCode: number;
  private errorCode: string;
  private errorMessage: string;

  constructor({ statusCode, errorCode, errorMessage }: ErrorResponseType) {
    this.statusCode = statusCode ? statusCode : 500;
    this.errorCode = errorCode;
    this.errorMessage = errorMessage;
  }
}

class SuccessResponse {
  private statusCode: number;
  private data: any;
  private message: string;

  constructor({ statusCode, data, message }: successResponseType) {
    this.statusCode = statusCode ? statusCode : 200;
    this.data = data;
    this.message = message;
  }
}

export { ErrorResponse, SuccessResponse };
