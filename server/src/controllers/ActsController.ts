import { NextFunction, Request, Response, Router } from "express";
import { ErrorResponse, SuccessResponse } from "../utils/Response";
import ActModel from "../schema/Act";
import { loggerString } from "../utils/helperMethods";
import logger from "../config/Logger";
import {
  ACTS_ERROR,
  INTERNAL_SERVER_ERROR,
  genericActError,
} from "../constants/errorResponeMapping";

export const getAllActs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const allActs = await ActModel.find({});
  res.status(200).json(
    new SuccessResponse({
      data: allActs,
    })
  );
};

export const createAct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // getting body
    const newActData = req.body;

    // creating New Theater
    await ActModel.create(newActData);

    //  sending success response
    res.status(200).json(
      new SuccessResponse({
        message: "Act Created Successfully",
      })
    );
  } catch (error) {
    // logging error in case
    logger.error(loggerString("Error While Creating Theater", error));

    // check for cast error
    if (error.name === "ValidationError") {
      res.status(500).json(new ErrorResponse(genericActError(error.message)));
    }

    // responsing with generic error
    res.status(500).json(new ErrorResponse(ACTS_ERROR.CREATE_ACT_ERROR));
  }
};
