import { Router } from "express";
import { mockRouteEndpoints } from "../config/constants";
import { mockFuntion } from "../controllers/MockController";

class ActsRouter {
  public _router = Router();

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  private _configure() {
    this._router.post(mockRouteEndpoints.MOCK, mockFuntion);
    this._router.get(mockRouteEndpoints.MOCK, mockFuntion);
  }
}

export = new ActsRouter().router;
