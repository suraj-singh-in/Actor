import { NextFunction, Request, Response, Router } from "express";

import ActsRouter from "./ActsRouter";
import HealthRouter from "./HealthRouter";
import TheaterRouter from "./TheaterRouter";

import { MasterRouterRouteMap } from "../config/constants";

class MasterRouter {
  public _router = Router();
  private healthRouter = HealthRouter;
  private actsRouter = ActsRouter;
  private theaterRouter = TheaterRouter;

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  private _configure() {
    this._router.use(MasterRouterRouteMap.CONFIG_ROUTE, this.healthRouter);
    this._router.use(MasterRouterRouteMap.ACTS_ROUTE, this.actsRouter);
    this._router.use(MasterRouterRouteMap.THEATER_ROUTE, this.theaterRouter);
  }
}

export = new MasterRouter().router;
