import { Router } from "express";
import passport from "passport";

import {
  changeActiveVerse,
  createAct,
  getAllActs,
} from "../controllers/ActsController";
import { ActsRouteEndpoints } from "../config/constants";
import { postRequestValidator } from "../utils/helperMethods";
import { ActValidationRule } from "../constants/requestValidationRules";

class ActsRouter {
  public _router = Router();

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  private _configure() {
    this._router.post(
      ActsRouteEndpoints.CREATE_ACT,
      postRequestValidator(ActValidationRule.createActRequestRule),
      passport.authenticate("jwt", { session: false }),
      createAct
    );
    this._router.post(
      ActsRouteEndpoints.CHANGE_ACTIVE_VERSE,
      postRequestValidator(ActValidationRule.changeActiveVerseRequestRule),
      passport.authenticate("jwt", { session: false }),
      changeActiveVerse
    );
    this._router.get(
      ActsRouteEndpoints.GET_ALL_ACTS,
      passport.authenticate("jwt", { session: false }),
      getAllActs
    );
  }
}

export = new ActsRouter().router;
