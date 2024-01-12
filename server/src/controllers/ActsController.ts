import { NextFunction, Request, Response, Router } from "express";
import { ErrorResponse, SuccessResponse } from "../utils/Response";
import ActModel from "../schema/Act";
import { loggerString } from "../utils/helperMethods";
import logger from "../config/Logger";
import {
  ACTS_ERROR,
  BAD_REQUEST_ERROR,
  genericActError,
} from "../constants/errorResponeMapping";
import VerseModal from "../schema/Verse";
import TheaterModel from "../schema/Theater";

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

    // get theater from theater id
    const theater = await TheaterModel.findOne({ _id: newActData.theaterId });

    // if theater does note exist
    if (!theater) {
      return res.status(400).json(BAD_REQUEST_ERROR);
    }

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
    const formmatedVerses = allVerses.map(({ ...rest }) => ({
      actId: newActId,
      ...rest,
    }));

    // create all Verse
    await VerseModal.create(formmatedVerses);

    //  sending success response
    res.status(200).json(
      new SuccessResponse({
        message: "Act Created Successfully",
      })
    );
  } catch (error) {
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

export const changeActiveVerse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Getting body
    const { actId, verseId } = req.body;

    // check if the act exist
    const act = await ActModel.findById(actId);

    if (!act) {
      res.status(400).json(new ErrorResponse(BAD_REQUEST_ERROR));
    }

    // check if verse exist
    const verse = await VerseModal.findById(verseId);

    if (!verse) {
      res.status(400).json(new ErrorResponse(BAD_REQUEST_ERROR));
    }

    // Deactivate all verse for the Act except the specified one
    await VerseModal.updateMany(
      { _id: { $ne: verseId }, actId },
      { $set: { isActive: false } }
    );

    // Activate the specified verse
    await VerseModal.findByIdAndUpdate(verseId, { $set: { isActive: true } });

    res.status(200).json(
      new SuccessResponse({
        message: `Active Verse of ${act.name} changed to ${verse.name}`,
      })
    );
  } catch (error) {
    // logging error in case
    logger.error(loggerString("Error While Changing active verse", error));

    // check for cast error
    if (error.name === "CastError") {
      res.status(500).json(new ErrorResponse(genericActError(error.message)));
    }

    // responsing with generic error
    res.status(500).json(new ErrorResponse(ACTS_ERROR.CREATE_ACT_ERROR));
  }
};
