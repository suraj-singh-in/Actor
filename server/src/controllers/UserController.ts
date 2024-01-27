import { NextFunction, Request, Response } from "express";
import UserModel from "../schema/User";
import { SuccessResponse } from "../utils/Response";

export const getUserList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  var usersProjection = {
    __v: false,
    hash: false,
    salt: false,
    roleList: false,
    userName: false,
  };

  const allUserList = await UserModel.find({}, usersProjection);
  return res.status(200).json(
    new SuccessResponse({
      data: { users: allUserList },
    })
  );
};
