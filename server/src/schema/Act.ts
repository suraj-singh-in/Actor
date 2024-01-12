// actModel.ts
import { Schema, model, Document } from "mongoose";

// Define the interface for the document
export interface ActDocument extends Document {
  name: string;
}

// Define the schema
const actSchema = new Schema<ActDocument>({
  name: { type: String, required: true },
});

// Create and export the model
const ActModel = model<ActDocument>("Act", actSchema);

export default ActModel;
