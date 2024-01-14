import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../utils/Response";
import {
  BAD_REQUEST_ERROR,
  INTERNAL_SERVER_ERROR,
} from "../constants/errorResponeMapping";
import TheaterModel from "../schema/Theater";
import ActModel from "../schema/Act";
import VerseModel from "../schema/Verse";
import logger from "../config/Logger";
import { loggerString } from "../utils/helperMethods";

export const mockFuntion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // get project and route name from path
    const projectName = req.params.projectName;
    const actRoute = "/" + req.params.actRoute;

    // get Request Method
    const requestMethod = req.method;

    // log
    logger.info(
      loggerString("Mock Called for :", projectName, requestMethod, actRoute)
    );

    // check if the theater for given name exist
    const theater = await TheaterModel.findOne({ name: projectName });

    // return error if no theater found
    if (!theater) {
      return res.status(400).json(BAD_REQUEST_ERROR);
    }

    // find the act with given endpoint
    const act = await ActModel.findOne({
      theaterId: theater["_id"],
      endPoint: actRoute,
      method: requestMethod,
    });

    // return error if no act found
    if (!act) {
      return res.status(400).json(BAD_REQUEST_ERROR);
    }

    //find Active Verse
    const activeVerse = await VerseModel.findOne({
      isActive: true,
      actId: act["_id"],
    });

    // return error if no Active Verse found
    if (!activeVerse) {
      return res.status(400).json(BAD_REQUEST_ERROR);
    }

    //TODO! return based on active verse type
    return res.status(activeVerse.httpCode).json(JSON.parse(activeVerse.response));
  } catch (error) {
    logger.error(loggerString("Error While Mocking", error));
    return res.status(500).json(new ErrorResponse(INTERNAL_SERVER_ERROR));
  }
};
