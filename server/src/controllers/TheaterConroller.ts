import { NextFunction, Request, Response, Router } from "express";
import { ErrorResponse, SuccessResponse } from "../utils/Response";
import logger from "../config/Logger";
import {
  INTERNAL_SERVER_ERROR,
  THEATER_ERROR,
} from "../constants/errorResponeMapping";
import TheaterModel from "../schema/Theater";
import { loggerString } from "../utils/helperMethods";
import ActModel from "../schema/Act";
import VerseModal from "../schema/Verse";

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
    let newTheater = await TheaterModel.create(newTheaterData);

    //  sending success response
    return res.status(200).json(
      new SuccessResponse({
        data: newTheater,
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

const getTheaterDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // get project and route name from path
    const theaterId = req.params.theaterId;

    // get Theater from Id
    const theater = await TheaterModel.findById(theaterId);

    // send error if no theater found
    if (!theater) {
      return res
        .status(500)
        .json(new ErrorResponse(THEATER_ERROR.THEATER_NOT_FOUND));
    }

    // Find all acts associated with the theater
    const acts = await ActModel.find({ theaterId: theater._id });

    // Find all verses associated with the acts
    const verses = await VerseModal.find({
      actId: { $in: acts.map((act) => act._id) },
    }).exec();

    // Group verses by actId
    const versesByActId = verses.reduce((acc, verse) => {
      acc[verse.actId.toString()] = acc[verse.actId.toString()] || [];
      acc[verse.actId.toString()].push(verse);
      return acc;
    }, {});

    // Combine acts and associated verses
    const actsWithVerses = acts.map((act) => ({
      ...act.toObject(),
      verses: versesByActId[act._id.toString()] || [],
    }));

    return res.status(200).json(
      new SuccessResponse({
        data: { theaterDetails: theater, actDetails: actsWithVerses },
      })
    );
  } catch (error) {
    // logging error in case
    logger.error(loggerString("Error While getting theater details", error));

    // responsing with generic error
    return res.status(500).json(new ErrorResponse(INTERNAL_SERVER_ERROR));
  }
};

export { createTheater, getTheaterDetails };
