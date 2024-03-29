// Theater Model

// imports
import { Schema, model, Document } from "mongoose";

// Define the interface for the document
export interface TheaterDocument extends Document {
  name: string;
  logo: string;
  isAdminTheater: boolean;
  description: string;
  viewPermission: Schema.Types.ObjectId;
  editPermission: Schema.Types.ObjectId;
  createdAt: Date;
}

// Define the schema
const theaterSchema = new Schema<TheaterDocument>({
  name: { type: String, required: true, unique: true },
  logo: { type: String },
  description: { type: String },
  isAdminTheater: { type: Boolean, default: false },
  viewPermission: { type: Schema.Types.ObjectId, ref: "Permission" },
  editPermission: { type: Schema.Types.ObjectId, ref: "Permission" },
  createdAt: { type: Date, default: Date.now },
});

//create uniqe index
theaterSchema.index({ name: 1 }, { unique: true });

// Create the model
const TheaterModel = model<TheaterDocument>("Theater", theaterSchema);

//  export model
export default TheaterModel;
