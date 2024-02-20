import { Request, Response } from "express";

import RoleModel from "../schema/Role";
import { SuccessResponse } from "../utils/Response";

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
  } catch (error) {}
};
