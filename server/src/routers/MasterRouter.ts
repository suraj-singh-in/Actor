import { NextFunction, Request, Response, Router } from "express";

import { MasterRouterRouteMap } from "../config/constants";

import ActsRouter from "./ActsRouter";
import HealthRouter from "./HealthRouter";
import TheaterRouter from "./TheaterRouter";
import MockRouter from "./MockRouter";
import AuthRouter from "./AuthRouter";
import UserRouter from "./UserRouter";
import RoleRouter from "./RoleRouter";
import PermissionRouter from "./PermissionRouter";

class MasterRouter {
  public _router = Router();
  private healthRouter = HealthRouter;
  private actsRouter = ActsRouter;
  private theaterRouter = TheaterRouter;
  private mockRouter = MockRouter;
  private authRouter = AuthRouter;
  private userRouter = UserRouter;
  private roleRouter = RoleRouter;
  private permissionRouter = PermissionRouter;

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
    this._router.use(MasterRouterRouteMap.USER_ROUTER, this.userRouter);
    this._router.use(MasterRouterRouteMap.ROLE_ROUTER, this.roleRouter);
    this._router.use(
      MasterRouterRouteMap.PERMISSION_ROUTER,
      this.permissionRouter
    );
  }
}

export = new MasterRouter().router;
