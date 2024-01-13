import fs from "fs";
import path from "path";

import logger from "./Logger";
import UserModel from "../schema/User";

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const pathToKey = path.join(__dirname, "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf-8");

if (!PUB_KEY) {
  logger.error(
    "No public key string found. please enter id_rsa_pub.pem, in pem file."
  );
  process.exit(1);
}

// JWT Options
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
};

const strategy = new JwtStrategy(
  options,
  async (jwtPayload: any, done: Function) => {
    // We will assign the `sub` property on the JWT to the database ID of user
    try {
      let user = await UserModel.findOne({ _id: jwtPayload.sub });
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }

    return done(null, false);
  }
);

module.exports = (passport) => {
  passport.use(strategy);
};
