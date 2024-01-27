import passport from "passport";
import { Router } from "express";

import { TheaterRouteEndPoints } from "../config/constants";
import {
  addEditor,
  addViewer,
  cloneTheater,
  createTheater,
  getAllTheaterByUser,
  getTheaterDetails,
} from "../controllers/TheaterConroller";
import {
  isAdminMiddleware,
  postRequestValidator,
} from "../utils/helperMethods";
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
      passport.authenticate("jwt", { session: false }),
      postRequestValidator(TheaterValidationRule.createTheaterRequestRule),
      isAdminMiddleware,
      createTheater
    );
    this._router.post(
      TheaterRouteEndPoints.ADD_VIEWER_TO_THEATER,
      passport.authenticate("jwt", { session: false }),
      postRequestValidator(
        TheaterValidationRule.editViewerOrEditorListRequestRule
      ),
      isAdminMiddleware,
      addViewer
    );
    this._router.post(
      TheaterRouteEndPoints.ADD_EDITOR_TO_THEATER,
      passport.authenticate("jwt", { session: false }),
      postRequestValidator(
        TheaterValidationRule.editViewerOrEditorListRequestRule
      ),
      isAdminMiddleware,
      addEditor
    );
    this._router.post(
      TheaterRouteEndPoints.CLONE_THEATER,
      passport.authenticate("jwt", { session: false }),
      postRequestValidator(TheaterValidationRule.cloneTheaterRequestRule),
      cloneTheater
    );
    this._router.get(
      TheaterRouteEndPoints.GET_THEATER_DETAILS,
      passport.authenticate("jwt", { session: false }),
      getTheaterDetails
    );
    this._router.get(
      TheaterRouteEndPoints.GET_ALL_THEATER_BY_USER,
      passport.authenticate("jwt", { session: false }),
      getAllTheaterByUser
    );
  }
}

export = new TheaterRouter().router;
