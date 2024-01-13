/**
 * Module for setting up Passport JWT strategy for authentication.
 * @module PassportJwtStrategy
 */

import fs from "fs";
import path from "path";

import logger from "./Logger";
import UserModel from "../schema/User";

// Load necessary modules for Passport JWT strategy
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

// Load the public key from a PEM file
const pathToKey = path.join(__dirname, "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf-8");

// Check if the public key is available, exit the process if not found
if (!PUB_KEY) {
  logger.error(
    "No public key string found. please enter id_rsa_pub.pem, in pem file."
  );
  process.exit(1);
}

/**
 * JWT options for Passport JWT strategy.
 * @typedef {Object} JwtOptions
 * @property {Function} jwtFromRequest - Function to extract JWT from the request.
 * @property {string} secretOrKey - The public key for verifying the JWT signature.
 * @property {string[]} algorithms - Allowed JWT signing algorithms.
 */
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
};

/**
 * Passport JWT strategy for authentication.
 * @fires JwtStrategy#verify
 * @param {Object} jwtPayload - The payload decoded from the JWT token.
 * @param {Function} done - The callback function to return the user or an error.
 * @returns {Promise} A Promise representing the result of user lookup or an error.
 */
const strategy = new JwtStrategy(
  options,
  async (jwtPayload: any, done: Function) => {
    // We will assign the `sub` property on the JWT to the database ID of the user
    try {
      let user = await UserModel.findOne({ _id: jwtPayload.sub });
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }

    return done(null, false);
  }
);

/**
 * Exports a function to set up the Passport JWT strategy.
 * @param {Object} passport - The Passport instance to attach the strategy to.
 * @returns {void}
 * @function
 * @memberof module:PassportJwtStrategy
 */
module.exports = (passport) => {
  passport.use(strategy);
};
