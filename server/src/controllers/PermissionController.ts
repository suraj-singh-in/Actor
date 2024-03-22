import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../utils/Response";

import PermissionModel from "../schema/Permission";
import logger from "../config/Logger";
import { loggerString } from "../utils/helperMethods";
import { INTERNAL_SERVER_ERROR } from "../constants/errorResponeMapping";

export const getAllPermissions = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const allPermissions = await PermissionModel.find({});

    //  sending success response
    return res.status(200).json(
      new SuccessResponse({
        data: allPermissions,
      })
    );
  } catch (error) {
    // logging error in case
    logger.error(loggerString("Error While getting permissions", error));

    // responding with generic error
    return res.status(500).json(new ErrorResponse(INTERNAL_SERVER_ERROR));
  }
};

export const createPermission = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    // getting body
    const newPermissionBody = req.body;

    // creating New Theater
    let newPermission = await PermissionModel.create(newPermissionBody);

    //  sending success response
    return res.status(200).json(
      new SuccessResponse({
        message: "Permission Created Successfully",
      })
    );
  } catch (error) {
    // logging error in case
    logger.error(loggerString("Error While creating permission", error));

    // responding with generic error
    return res.status(500).json(new ErrorResponse(INTERNAL_SERVER_ERROR));
  }
};
