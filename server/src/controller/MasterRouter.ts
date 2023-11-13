import { NextFunction, Request, Response, Router } from "express";
import HealthController from "./HealthController";

class MasterRouter {
  public _router = Router();
  private healthController = HealthController;

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  private _configure() {
    this._router.use("/", this.healthController);
  }
}

export = new MasterRouter().router;
