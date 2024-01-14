import { NextFunction, Request, Response } from "express";
import {
  generatePassword,
  issueJWT,
  loggerString,
  validPassword,
} from "../utils/helperMethods";
import UserModel, { UserDocument } from "../schema/User";
import { ErrorResponse, SuccessResponse } from "../utils/Response";
import logger from "../config/Logger";
import {
  AUTH_ERROR,
  INTERNAL_SERVER_ERROR,
} from "../constants/errorResponeMapping";

/**
 * function for user registration (sign-up).
 * @function
 * @async
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function.
 */
export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // extranting user information body
    const { password, userName, name, roleList } = req.body;

    // check if user userName available
    const user = await UserModel.findOne({ userName });

    if (user) {
      return res
        .status(500)
        .json(new ErrorResponse(AUTH_ERROR.AUTH_USER_ALERADY_EXISTS));
    }

    // creating salt hash
    const { salt, hash } = generatePassword(password);

    // creating New User
    let newUser = await UserModel.create({
      salt,
      hash,
      userName,
      name,
      roleList,
    });

    // create new JWT token
    const jwt = issueJWT(newUser);

    // Send token to user
    return res.status(200).json(
      new SuccessResponse({
        data: { token: jwt.token, expiresIn: jwt.expires },
      })
    );
  } catch (error) {
    // logging error in case
    logger.error(loggerString("Error while signing up the user", error));

    // responsing with generic error
    return res.status(500).json(new ErrorResponse(INTERNAL_SERVER_ERROR));
  }
};

/**
 * function for fetching user details.
 * @function
 * @async
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function.
 */
export const getUserDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // these user details are submitted by passport strategy
    const userDetails: any = req["user"];

    // extract useful information
    const { name, userName, roleList } = userDetails;

    // send 200 response
    return res
      .status(200)
      .json(new SuccessResponse({ data: { name, userName, roleList } }));
  } catch (error) {
    // logging error in case
    logger.error(loggerString("Error while geting user information", error));

    // responsing with generic error
    return res.status(500).json(new ErrorResponse(INTERNAL_SERVER_ERROR));
  }
};

/**
 * function for user login/authentication.
 * @function
 * @async
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function.
 */
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // extranting user information body
    const { password, userName } = req.body;

    // getting user with requested userName
    const userDetails = await UserModel.findOne({ userName });

    // sending error if user not found
    if (!userDetails) {
      return res.status(401).json(new ErrorResponse(AUTH_ERROR.NO_USER_FOUND));
    }

    // checking if password is valid
    const isValidPassword = validPassword(
      req.body.password,
      userDetails.hash,
      userDetails.salt
    );

    // if not valid password send error
    if (!isValidPassword) {
      return res.status(401).json(new ErrorResponse(AUTH_ERROR.WRONG_PASSWORD));
    }

    // create new jwt token
    const jwtToken = issueJWT(userDetails);

    return res.status(200).json(
      new SuccessResponse({
        data: { token: jwtToken.token, expiresIn: jwtToken.expires },
      })
    );
  } catch (error) {
    // logging error in case
    logger.error(loggerString("Error while login user", error));

    // responsing with generic error
    return res.status(500).json(new ErrorResponse(INTERNAL_SERVER_ERROR));
  }
};
