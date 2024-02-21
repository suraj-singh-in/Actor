import { Request, Response } from "express";

import RoleModel from "../schema/Role";
import { ErrorResponse, SuccessResponse } from "../utils/Response";

import logger from "../config/Logger";
import { loggerString } from "../utils/helperMethods";

import {
  BAD_REQUEST_ERROR,
  INTERNAL_SERVER_ERROR,
} from "../constants/errorResponeMapping";

export const createRole = async (req: Request, res: Response): Promise<any> => {
  try {
    // getting body
    const newRoleData = req.body;

    let newRole = await RoleModel.create(newRoleData);

    //  sending success response
    return res.status(200).json(
      new SuccessResponse({
        data: newRole,
        message: "Role Created Successfully",
      })
    );
  } catch (error) {
    // logging error in case
    logger.error(loggerString("Error While creating role", error));

    // responding with generic error
    return res.status(500).json(new ErrorResponse(INTERNAL_SERVER_ERROR));
  }
};

export const editRole = async (req: Request, res: Response): Promise<any> => {
  try {
    // getting body
    const newRoleData = req.body;

    // get role from role id
    const role = await RoleModel.findOne({ _id: newRoleData.roleId });

    // if role does note exist
    if (!role) {
      return res.status(400).json(new ErrorResponse(BAD_REQUEST_ERROR));
    }

    // Updating role Details
    await RoleModel.findOneAndUpdate(
      {
        _id: newRoleData.roleId,
      },
      newRoleData
    );

    //  sending success response
    return res.status(200).json(
      new SuccessResponse({
        data: newRoleData,
        message: "Role Edited Successfully",
      })
    );
  } catch (error) {
    // logging error in case
    logger.error(loggerString("Error While creating role", error));

    // responding with generic error
    return res.status(500).json(new ErrorResponse(INTERNAL_SERVER_ERROR));
  }
};

export const getAllRoles = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    // get all the theater where is user
    const roleList = await RoleModel.find({}).populate("permissions");

    //  sending success response
    return res.status(200).json(
      new SuccessResponse({
        data: roleList,
      })
    );
  } catch (error) {
    // logging error in case
    logger.error(loggerString("Error While getting roles", error));

    // responding with generic error
    return res.status(500).json(new ErrorResponse(INTERNAL_SERVER_ERROR));
  }
};
