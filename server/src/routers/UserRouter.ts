import { Router } from "express";

import { UserRouterEndPoints } from "../config/constants";

import passport from "passport";
import { getUserList } from "../controllers/UserController";
import { isAdminMiddleware } from "../utils/helperMethods";

class UserRouter {
  public _router = Router();

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  private _configure() {
    this._router.get(
      UserRouterEndPoints.USER_LIST,
      passport.authenticate("jwt", { session: false }),
      isAdminMiddleware,
      getUserList
    );
  }
}

export = new UserRouter().router;
