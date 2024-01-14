import passport from "passport";
import { Router } from "express";

import { TheaterRouteEndPoints } from "../config/constants";
import { createTheater } from "../controllers/TheaterConroller";
import { isAdminMiddleware, postRequestValidator } from "../utils/helperMethods";
import { TheaterValidationRule } from "../constants/requestValidationRules";

class TheaterRouter {
  public _router = Router();

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  private _configure() {
    this._router.post(
      TheaterRouteEndPoints.CREATE_THEATER,
      postRequestValidator(TheaterValidationRule.createTheaterRequestRule),
      passport.authenticate("jwt", { session: false }),
      isAdminMiddleware,
      createTheater
    );
  }
}

export = new TheaterRouter().router;
