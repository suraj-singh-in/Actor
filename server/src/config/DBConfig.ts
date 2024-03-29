import mongoose, { Connection, ConnectOptions } from "mongoose";
import logger from "./Logger";

class MongoConnection {
  private static instance: MongoConnection;
  private connection: Connection;

  public constructor() {
    // Actual database URI
    const databaseUrl = process.env.MONGODB_URI;

    // If no database URI exits, log error and close the application
    if (!databaseUrl) {
      logger.error('No mongo connection string. Set databaseUrl environment variable.')
      process.exit(1)
    }

    // Connect to MongoDB using Mongoose
    mongoose
      .connect(databaseUrl)
      .then(async () => {
        console.log("Connected to MongoDB");
      })
      .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
        throw err;
      });

    // Set the instance to this newly created instance
    MongoConnection.instance = this;
    this.connection = mongoose.connection;
  }

  // Getter method to access the Mongoose connection
  public static getInstance(): Connection {
    if (!MongoConnection.instance) {
      new MongoConnection();
    }

    // Return the Mongoose connection directly
    return MongoConnection.instance.connection;
  }
}

// Create a Singleton instance of the MongoConnection class
const mongoConnectionInstance = new MongoConnection();

// Export the Mongoose connection to be used throughout the application
export default mongoConnectionInstance;
