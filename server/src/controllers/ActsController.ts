import { NextFunction, Request, Response, Router } from "express";
import { SuccessResponse } from "../utils/Response";
import ActModel from "../schema/Act";

const getAllActs = async (req: Request, res: Response, next: NextFunction) => {
  const allActs = await ActModel.find({});
  res.status(200).json(
    new SuccessResponse({
      data: allActs,
    })
  );
};

export { getAllActs };
