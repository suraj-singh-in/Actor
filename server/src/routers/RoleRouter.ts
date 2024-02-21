import { Router } from "express";

import { RoleRouterEndPoints } from "../config/constants";
import { RoleValidationRule } from "../constants/requestValidationRules";

import {
  createRole,
  getAllRoles,
  editRole,
} from "../controllers/RoleController";

import {
  isAdminMiddleware,
  postRequestValidator,
} from "../utils/helperMethods";

// @ts-ignore
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
    this._router.post(
      RoleRouterEndPoints.CREATE,
      postRequestValidator(RoleValidationRule.createRoleRule),
      passport.authenticate("jwt", { session: false }),
      isAdminMiddleware,
      createRole
    );
    this._router.post(
      RoleRouterEndPoints.EDIT,
      postRequestValidator(RoleValidationRule.editRequestRule),
      passport.authenticate("jwt", { session: false }),
      editRole
    );
    this._router.get(
      RoleRouterEndPoints.GET_ALL,
      passport.authenticate("jwt", { session: false }),
      isAdminMiddleware,
      getAllRoles
    );
  }
}

export = new RoleRouter().router;
