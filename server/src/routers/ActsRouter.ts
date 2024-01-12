import { Router } from "express";
import { createAct, getAllActs } from "../controllers/ActsController";
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
      createAct
    );
    this._router.get(ActsRouteEndpoints.GET_ALL_ACTS, getAllActs);
  }
}

export = new ActsRouter().router;
