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
import verseModal from "../schema/Verse";

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
    // Getting body
    const newActData = req.body;

    // Check if already exiting act
    const existingAct = await ActModel.findOne({
      name: newActData.name,
      theaterId: newActData.theaterId,
      method: newActData.method,
    });

    // if act already exist return the error
    if (existingAct) {
      return res
        .status(500)
        .json(new ErrorResponse(ACTS_ERROR.ACT_ALREADY_EXISTS_ERROR));
    }

    // get all the verse from the request
    const allVerses = newActData.verses;

    // get all active verse
    let activeVerse = allVerses.filter((verse) => verse.isActive);

    // if more or less than one active verse found send error
    if (activeVerse.length !== 1) {
      return res
        .status(500)
        .json(new ErrorResponse(ACTS_ERROR.MORE_THAN_ONE_ACTIVE_VERSE_ERROR));
    }

    // creating New Act
    let newAct = await ActModel.create(newActData);

    // get newAct Id
    let newActId = newAct["_id"];

    // create all verse
    const formmatedVerses = allVerses.map(({ isActive, ...rest }) => ({
      actId: newActId,
      ...rest,
    }));

    console.log("🚀 ~ formmatedVerses ~ formmatedVerses:", formmatedVerses);

    // create all Verse
    await verseModal.create(formmatedVerses);

    //  sending success response
    res.status(200).json(
      new SuccessResponse({
        message: "Act Created Successfully",
      })
    );
  } catch (error) {
    console.log("🚀 ~ error:", error)
    // logging error in case
    logger.error(loggerString("Error While Creating Act", error));

    // check for cast error
    if (error.name === "ValidationError") {
      res.status(500).json(new ErrorResponse(genericActError(error.message)));
    }

    // responsing with generic error
    res.status(500).json(new ErrorResponse(ACTS_ERROR.CREATE_ACT_ERROR));
  }
};
