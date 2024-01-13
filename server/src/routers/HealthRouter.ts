import { NextFunction, Request, Response, Router } from "express";
import logger from "../config/Logger";
import { SuccessResponse } from "../utils/Response";

class HealthController {
  public _router = Router();

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  private _configure() {
    this._router.get(
      "/health",
      (req: Request, res: Response, next: NextFunction) => {
        logger.info("Health Checked");
        return res.status(200).json(new SuccessResponse({ message: "OK 200" }));
      }
    );
  }
}

export = new HealthController().router;
