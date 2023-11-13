import { NextFunction, Request, Response, Router } from "express";

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
        res.status(200).json({ status: "OK 200" });
      }
    );
  }
}

export = new HealthController().router;
