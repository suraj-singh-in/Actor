import { Router } from "express";

import { AuthRouterEndPoints } from "../config/constants";
import { AuthValidationRule } from "../constants/requestValidationRules";

import { getUserDetails, login, signUp } from "../controllers/AuthController";
import { postRequestValidator } from "../utils/helperMethods";

import passport from "passport";

class AuthRouter {
  public _router = Router();

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  private _configure() {
    this._router.post(
      AuthRouterEndPoints.SIGN_UP,
      postRequestValidator(AuthValidationRule.registerUserRequestRule),
      signUp
    );
    this._router.post(
      AuthRouterEndPoints.LOGIN,
      postRequestValidator(AuthValidationRule.loginUserRequestRule),
      login
    );
    this._router.get(
      AuthRouterEndPoints.GET_USER_DETAILS,
      passport.authenticate("jwt", { session: false }),
      getUserDetails
    );
  }
}

export = new AuthRouter().router;
