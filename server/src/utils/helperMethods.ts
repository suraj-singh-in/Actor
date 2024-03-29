import { NextFunction, Request, RequestHandler, Response } from "express";
import { ErrorResponse } from "./Response";
import {
  BAD_REQUEST_ERROR,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
} from "../constants/errorResponeMapping";
import logger from "../config/Logger";
import { ValidationRules } from "./typeDefinations";

import fs from "fs";
import path from "path";
import UserModel, { UserDocument } from "../schema/User";

import RoleModel from "../schema/Role";
import mongoose from "mongoose";

const Validator = require("validatorjs");
const crypto = require("crypto");
const jsonwebtoken = require("jsonwebtoken");

const pathToKey = path.join(__dirname, "..", "config/id_rsa_priv.pem");
const PRIVATE_KEY = fs.readFileSync(pathToKey, "utf8");

/**
 * Joins any number of arguments into a single string separated by commas.
 * If an argument is an object, it will be converted to JSON string format.
 * @param {...any} args - Any number of arguments to be joined.
 * @returns {string} - A string joined by commas.
 */
export const loggerString = (...args: any[]): string => {
  return args
    .map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : arg))
    .join(": ");
};

/**
 *
 * @param {*} password - The plain text password
 * @param {*} hash - The hash stored in the database
 * @param {*} salt - The salt stored in the database
 *
 * This function uses the crypto library to decrypt the hash using the salt and then compares
 * the decrypted hash/salt with the password that the user provided at login
 */
export const validPassword = (password: string, hash: string, salt: string) => {
  var hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return hash === hashVerify;
};

/**
 *
 * @param {*} password - The password string that the user inputs to the password field in the register form
 *
 * This function takes a plain text password and creates a salt and hash out of it.  Instead of storing the plaintext
 * password in the database, the salt and hash are stored for security
 *
 * ALTERNATIVE: It would also be acceptable to just use a hashing algorithm to make a hash of the plain text password.
 * You would then store the hashed password in the database and then re-hash it to verify later (similar to what we do here)
 */
export const generatePassword = (password: string) => {
  var salt = crypto.randomBytes(32).toString("hex");
  var genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return {
    salt: salt,
    hash: genHash,
  };
};

/**
 * @param {*} user - The user object.  We need this to set the JWT `sub` payload property to the MongoDB user ID
 */
export const issueJWT = (user: UserDocument) => {
  const _id = user._id;

  const expiresIn = "1d";

  const payload = {
    sub: _id,
    iat: Date.now(),
  };

  const signedToken = jsonwebtoken.sign(payload, PRIVATE_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
};

/**
 * Express middleware for validating POST request data based on specified validation rules.
 * @function
 * @param {ValidationRules} rules - Validation rules to be applied to the request body.
 * @returns {RequestHandler} Express middleware function.
 * @throws Will throw an error if there is an issue during validation.
 */
export const postRequestValidator =
  (rules: ValidationRules): RequestHandler =>
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;

    try {
      // validation
      const validation = new Validator(data, rules);

      // on pass move to next function
      validation.passes(() => {
        logger.info(loggerString("Request validation passed for", data));
        next();
      });

      // on fail return error response
      validation.fails(() => {
        logger.error(loggerString("Request validation failed", data));
        res
          .status(412)
          .send(new ErrorResponse(BAD_REQUEST_ERROR, validation.errors));
      });
    } catch (error) {
      logger.error(loggerString("Request validation failed", error));

      // on fail send generic error
      return res.status(412).send(new ErrorResponse(INTERNAL_SERVER_ERROR));
    }
  };

export const isAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // these user details are submitted by passport strategy
  const userDetails: any = req["user"];

  // extract useful information
  const { roleList } = userDetails;

  try {
    const roles = await RoleModel.find({
      _id: { $in: roleList },
      key: "admin",
    });

    if (roles && roles.length > 0) {
      next();
    } else {
      return res.status(401).json(new ErrorResponse(UNAUTHORIZED));
    }
  } catch (error) {
    return res.status(401).json(new ErrorResponse(UNAUTHORIZED));
  }
};

export async function getUserPermissions(userID: string) {
  try {
    const userPermissions = await UserModel.aggregate([
      { $match: { _id: userID } }, // Match the user by ID
      {
        $lookup: {
          // Perform a left outer join with the roles collection
          from: "roles",
          localField: "roleList",
          foreignField: "_id",
          as: "roles",
        },
      },
      { $unwind: "$roles" }, // Unwind the roles array
      {
        $lookup: {
          // Perform a left outer join with the permissions collection
          from: "permissions",
          localField: "roles.permissions",
          foreignField: "_id",
          as: "permissions",
        },
      },
      {
        $project: {
          // Project only the permission fields
          _id: 0,
          permissions: 1,
        },
      },
    ]);

    // Flatten the permissions array
    const permissions =
      userPermissions.length > 0
        ? userPermissions.map((user) => user.permissions).flat()
        : [];

    return permissions;
  } catch (error) {
    console.error("Error getting user permissions:", error);
    throw error;
  }
}
