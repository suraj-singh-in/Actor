import { NextFunction, Request, RequestHandler, Response } from "express";
import { ErrorResponse } from "./Response";
import { BAD_REQUEST_ERROR } from "../constants/errorResponeMapping";
import logger from "../config/Logger";
import { ValidationRules } from "./typeDefinations";

const Validator = require("validatorjs");

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

export const postRequestValidator =
  (rules: ValidationRules): RequestHandler =>
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;

    try {
      // validation
      const validation = new Validator(data, rules);

      // on pass move to next function
      validation.passes(() => {
        logger.info(loggerString("Request validation passed for", data));
        next();
      });

      // on fail return error response
      validation.fails(() => {
        logger.error(loggerString("Request validation failed", data));
        res
          .status(412)
          .send(new ErrorResponse(BAD_REQUEST_ERROR, validation.errors));
      });
    } catch (error) {
      logger.error(loggerString("Request validation failed", error));
    }
  };
