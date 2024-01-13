import { NextFunction, Request, Response, Router } from "express";
import { ErrorResponse, SuccessResponse } from "../utils/Response";
import logger from "../config/Logger";
import { INTERNAL_SERVER_ERROR } from "../constants/errorResponeMapping";
import TheaterModel from "../schema/Theater";
import { loggerString } from "../utils/helperMethods";

/**
 * Create a new theater based on the provided request data.
 * @function
 * @async
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void> } - A promise that resolves once the theater is created and the response is sent.
 */
const createTheater = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // getting body
    const newTheaterData = req.body;

    // creating New Theater
    await TheaterModel.create(newTheaterData);

    //  sending success response
    return res.status(200).json(
      new SuccessResponse({
        message: "Theater Created Successfully",
      })
    );
  } catch (error) {
    // logging error in case
    logger.error(loggerString("Error While Creating Theater", error));

    // responsing with generic error
    return res.status(500).json(new ErrorResponse(INTERNAL_SERVER_ERROR));
  }
};

export { createTheater };
