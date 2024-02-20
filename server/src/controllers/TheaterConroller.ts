import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../utils/Response";
import logger from "../config/Logger";
import {
  AUTH_ERROR,
  INTERNAL_SERVER_ERROR,
  THEATER_ERROR,
  UNAUTHORIZED,
} from "../constants/errorResponeMapping";
import TheaterModel, { TheaterDocument } from "../schema/Theater";
import { loggerString } from "../utils/helperMethods";
import ActModel from "../schema/Act";
import VerseModel from "../schema/Verse";
import UserModel from "../schema/User";
import PermissionModel from "../schema/Permission";

const generateTheaterPermissions = async (theater: TheaterDocument) => {
  const editPermission = {
    name: `${theater.name} Edit`,
    key: `${theater.name}_edit`,
    description: `Edit Permission for Theater ${theater.name}`,
  };
  const viewPermission = {
    name: `${theater.name} View`,
    key: `${theater.name}_view`,
    description: `View Permission for Theater ${theater.name}`,
  };
  await PermissionModel.create(editPermission);
  await PermissionModel.create(viewPermission);
};

/**
 * Create a new theater based on the provided request data.
 * @function
 * @async
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns { } - A promise that resolves once the theater is created and the response is sent.
 */
const createTheater = async (req: Request, res: Response): Promise<any> => {
  try {
    // getting body
    const newTheaterData = req.body;

    // these user details are submitted by passport strategy
    const userDetails: any = req["user"];

    // get id from userDetails
    const { _id } = userDetails;

    //add creator in editor list if not included
    if (!newTheaterData["editorList"].includes(_id)) {
      newTheaterData["editorList"].push(_id);
    }

    // creating New Theater
    let newTheater = await TheaterModel.create(newTheaterData);

    // Create new permissions for the theater
    await generateTheaterPermissions(newTheater);

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

    // responding with generic error
    return res.status(500).json(new ErrorResponse(INTERNAL_SERVER_ERROR));
  }
};

const getTheaterDetails = async (req: Request, res: Response) => {
  try {
    // get project and route name from path
    const theaterId = req.params.theaterId;

    // get Theater from ID
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
    const verses = await VerseModel.find({
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

    // responding with generic error
    return res.status(500).json(new ErrorResponse(INTERNAL_SERVER_ERROR));
  }
};

const getAllTheaterByUser = async (req: Request, res: Response) => {
  try {
    // these user details are submitted by passport strategy
    const userDetails: any = req["user"];

    // get id from userDetails
    const { _id: userId } = userDetails;

    // get all the theater where is user
    const theaters = await TheaterModel.aggregate([
      {
        $match: {
          $or: [{ viewerList: userId }, { editorList: userId }],
        },
      },
      {
        $lookup: {
          from: "acts",
          localField: "_id",
          foreignField: "theaterId",
          as: "acts",
        },
      },
      {
        $addFields: {
          numberOfActs: { $size: "$acts" },
        },
      },
      {
        $project: {
          acts: 0, // Exclude the acts array from the final result if you don't need it
        },
      },
    ]);

    // getting only useful data
    const filterTheatersData = theaters.map(
      ({ name, isAdminTheater, numberOfActs, createdAt, _id }) => ({
        name,
        isAdminTheater,
        numberOfActs,
        createdAt,
        theaterId: _id,
      })
    );

    // sending the response
    return res.status(200).json(
      new SuccessResponse({
        data: { theaters: filterTheatersData },
      })
    );
  } catch (error) {
    // logging error in case
    logger.error(loggerString("Error while getting theater detail", error));

    // responding with generic error
    return res.status(500).json(new ErrorResponse(INTERNAL_SERVER_ERROR));
  }
};

const addViewer = async (req: Request, res: Response) => {
  try {
    // get theaterId and userId from body
    const { theaterId, userId } = req.body;

    // get Theater from ID
    const theater = await TheaterModel.findById(theaterId);

    // send error if no theater found
    if (!theater) {
      return res
        .status(500)
        .json(new ErrorResponse(THEATER_ERROR.THEATER_NOT_FOUND));
    }

    // get user from Id
    const user = await UserModel.findById(userId);

    // send error if no user found
    if (!user) {
      return res.status(500).json(new ErrorResponse(AUTH_ERROR.NO_USER_FOUND));
    }

    // check if user is already in the list
    if (theater.viewerList.includes(userId)) {
      return res
        .status(500)
        .json(new ErrorResponse(THEATER_ERROR.USER_ALREADY_IN_LIST));
    }

    // Add the user to the viewerList
    theater.viewerList.push(userId);

    // Save the updated theater document
    await theater.save();

    return res.status(200).json(
      new SuccessResponse({
        message: "User added to viewerList successfully",
      })
    );
  } catch (error) {
    // logging error in case
    logger.error(loggerString("Error While adding user to viewer list", error));

    // responding with generic error
    return res.status(500).json(new ErrorResponse(INTERNAL_SERVER_ERROR));
  }
};

const addEditor = async (req: Request, res: Response) => {
  try {
    // get theaterId and userId from body
    const { theaterId, userId } = req.body;

    // get Theater from ID
    const theater = await TheaterModel.findById(theaterId);

    // send error if no theater found
    if (!theater) {
      return res
        .status(500)
        .json(new ErrorResponse(THEATER_ERROR.THEATER_NOT_FOUND));
    }

    // get user from Id
    const user = await UserModel.findById(userId);

    // send error if no user found
    if (!user) {
      return res.status(500).json(new ErrorResponse(AUTH_ERROR.NO_USER_FOUND));
    }

    if (!user.roleList.includes("ADMIN")) {
      return res.status(401).json(new ErrorResponse(AUTH_ERROR.NOT_ADMIN_USER));
    }

    // check if user is already in the list
    if (theater.editorList.includes(userId)) {
      return res
        .status(500)
        .json(new ErrorResponse(THEATER_ERROR.USER_ALREADY_IN_LIST));
    }

    // Add the user to the editorList
    theater.editorList.push(userId);

    // Save the updated theater document
    await theater.save();

    return res.status(200).json(
      new SuccessResponse({
        message: "User added to Editor successfully",
      })
    );
  } catch (error) {
    // logging error in case
    logger.error(loggerString("Error While adding user to editor list", error));

    // responding with generic error
    return res.status(500).json(new ErrorResponse(INTERNAL_SERVER_ERROR));
  }
};

const cloneTheater = async (req: Request, res: Response) => {
  try {
    // 1. CHECK IF THE THEATER EXISTS
    // get theaterId from body
    const { theaterId } = req.body;

    // get Theater from ID
    const theater = await TheaterModel.findById(theaterId);

    // send error if no theater found
    if (!theater) {
      return res
        .status(500)
        .json(new ErrorResponse(THEATER_ERROR.THEATER_NOT_FOUND));
    }

    // 2. CHECK IF THE USER HAVE PERMISSION TO CLONE THE THEATER
    // these user details are submitted by passport strategy
    const userDetails: any = req["user"];

    // get id from userDetails
    const { _id, userName } = userDetails;

    // if user is not the editor of the given route, then user cannot edd acts in it
    if (
      !(theater.viewerList.includes(_id) || theater.editorList.includes(_id))
    ) {
      return res.status(500).json(new ErrorResponse(UNAUTHORIZED));
    }

    // if the theater is already exist send error
    const checkTheater = await TheaterModel.find({
      name: theater.name + "_" + userName,
    });

    if (checkTheater && checkTheater.length) {
      return res
        .status(500)
        .json(new ErrorResponse(THEATER_ERROR.THEATER_ALREADY_CLONED));
    }

    // 3. CREATE CLONE THEATER PROPERTIES
    // create properties for cloned theater
    const clonedTheaterProperties = {
      name: theater.name + "_" + userName,
      isAdminTheater: false,
      logo: theater.logo,
      viewerList: [],
      editorList: [_id],
    };

    // create a new cloned theater
    const clonedTheater = await TheaterModel.create(clonedTheaterProperties);

    // 4. Retrieve acts associated with the original theater
    const originalActs = await ActModel.find({
      theaterId,
    });

    // 5. Clone each act from the original theater and associate it with the new theater
    for (const originalAct of originalActs) {
      const clonedAct = new ActModel({
        name: originalAct.name,
        endPoint: originalAct.endPoint,
        method: originalAct.method,
        theaterId: clonedTheater._id,
      });

      await clonedAct.save();

      // 6. Clone each verse from the original acts and associate them with the new acts
      const originalVerses = await VerseModel.find({ actId: originalAct._id });

      for (const originalVerse of originalVerses) {
        const clonedVerse = new VerseModel({
          name: originalVerse.name,
          response: originalVerse.response,
          responseType: originalVerse.responseType,
          httpCode: originalVerse.httpCode,
          isActive: originalVerse.isActive,
          actId: clonedAct._id,
        });

        await clonedVerse.save();
      }
    }

    return res.status(200).json(
      new SuccessResponse({
        message: `Theater Cloned Successfully with ${clonedTheater._id}`,
      })
    );
  } catch (error) {
    // logging error in case
    logger.error(loggerString("Error While cloning the theater", error));

    // responding with generic error
    return res.status(500).json(new ErrorResponse(INTERNAL_SERVER_ERROR));
  }
};

export {
  createTheater,
  getTheaterDetails,
  addViewer,
  addEditor,
  cloneTheater,
  getAllTheaterByUser,
};
