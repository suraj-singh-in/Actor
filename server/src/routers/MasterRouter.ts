import { NextFunction, Request, Response, Router } from "express";

import ActsRouter from "./ActsRouter";
import HealthRouter from "./HealthRouter";
import TheaterRouter from "./TheaterRouter";

import { MasterRouterRouteMap } from "../config/constants";
import MockRouter from "./MockRouter";
import AuthRouter from "./AuthRouter";

class MasterRouter {
  public _router = Router();
  private healthRouter = HealthRouter;
  private actsRouter = ActsRouter;
  private theaterRouter = TheaterRouter;
  private mockRouter = MockRouter;
  private authRouter = AuthRouter;

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
    this._router.use(MasterRouterRouteMap.AUTH_ROUTER, this.authRouter);
    this._router.use(MasterRouterRouteMap.MOCK_ROUTE, this.mockRouter);
  }
}

export = new MasterRouter().router;
