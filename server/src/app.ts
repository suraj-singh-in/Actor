// Import necessary modules and libraries
import express, { Request, Response, NextFunction } from "express";
import { JsonParser, ObjectMapper } from "jackson-js";

import process from "process";
import rTracer from "cls-rtracer";

require("./config/DBConfig");
require("./config/DBSchemas");

import logger from "./config/Logger";

// Import the main router from the specified file
import MasterRouter from "./controller/MasterRouter";

// Create an instance of ObjectMapper for JSON handling
export const objectMapper = new ObjectMapper();
// Create an instance of JsonParser for JSON parsing
export const jsonParser = new JsonParser();

// Define a class representing the server
export class Server {
  // Create an Express application instance
  public app = express();
  // Set the router for the server
  public router = MasterRouter;
}

// Create an instance of the Server class
const server = new Server();
logger.info("Server Launched at:", process.pid);

// Set up middleware for parsing incoming requests
server.app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
server.app.use(express.json()); // Parse JSON bodies
server.app.use(express.raw()); // Parse raw request bodies
server.app.use(rTracer.expressMiddleware()); // Add request tracing middleware

// Use the specified router for handling routes
server.app.use("/", server.router);

// Error handling middleware for unhandled errors
server.app.use(
  (error: unknown, req: Request, res: Response, next: NextFunction) => {
    logger.error("🚀 ~ file: app.ts:30 ~ server.app.use ~ error:", error);
    res
      .status(500)
      .header("Content-Type", "application/json")
      .send({ error: "Something went wrong" });
  }
);

// Middleware for handling 404 Not Found errors
server.app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404);

  if (req.accepts("json")) {
    res.json({ error: "Not Found" });
    return;
  }

  res.type("text").send("Not Found");
});

// Event listener for unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection at: , ", promise, "reason", reason);
});

// start the server on the specified port
server.app.listen(process.env.APP_PORT || 8080, () => {
  logger.info("Server Initialized at :", process.env.APP_PORT || 8080);
});
