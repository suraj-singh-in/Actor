import { Router } from "express";
import { getAllActs } from "../controllers/ActsController";
import { ActsRouteEndpoints } from "../config/constants";

class ActsRouter {
  public _router = Router();

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  private _configure() {
    this._router.get(ActsRouteEndpoints.GET_ALL_ACTS, getAllActs);
  }
}

export = new ActsRouter().router;
