import { NextFunction, Request, Response, Router } from "express";
import HealthRouter from "./HealthRouter";
import ActsRouter from "./ActsRouter";
import { MasterRouterRouteMap } from "../config/constants";

class MasterRouter {
  public _router = Router();
  private healthRouter = HealthRouter;
  private actsRouter = ActsRouter;

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  private _configure() {
    this._router.use(MasterRouterRouteMap.CONFIG_ROUTE, this.healthRouter);
    this._router.use(MasterRouterRouteMap.ACTS_ROUTE, this.actsRouter);
  }
}

export = new MasterRouter().router;
