import { NextFunction, Request, Response, Router } from "express";

export const getAllActs = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ acts: "Acts" });
};
