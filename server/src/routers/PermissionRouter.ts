import { Router } from "express";

import { PermissionRouterEndPoints } from "../config/constants";

import { isAdminMiddleware } from "../utils/helperMethods";

import {
  createPermission,
  getAllPermissions,
} from "../controllers/PermissionController";

import passport from "passport";

class RoleRouter {
  public _router = Router();

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  private _configure() {
    this._router.get(
      PermissionRouterEndPoints.GET_ALL,
      passport.authenticate("jwt", { session: false }),
      isAdminMiddleware,
      getAllPermissions
    );
    this._router.post(PermissionRouterEndPoints.CREATE, createPermission);
  }
}

export = new RoleRouter().router;
