// Theater Model

// imports
import { Schema, model, Document } from "mongoose";

// Define the interface for the document
export interface TheaterDocument extends Document {
  name: string;
  logo: string;
  permissions: string[];
}

// Define the schema
const theaterSchema = new Schema<TheaterDocument>({
  name: { type: String, required: true },
  logo: { type: String },
  permissions: [String],
});

// Create the model
const TheaterModel = model<TheaterDocument>("Theater", theaterSchema);

//  export model
export default TheaterModel;
