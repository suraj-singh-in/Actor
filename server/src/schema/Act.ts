// actModel.ts
import { Schema, model, Document } from "mongoose";

// Define the interface for the document
export interface ActDocument extends Document {
  name: string;
  theaterId: Schema.Types.ObjectId;
  endPoint: string;
  method: string;
}

// Define the schema
const actSchema = new Schema<ActDocument>({
  name: { type: String, required: true },
  endPoint: { type: String, required: true },
  theaterId: { type: Schema.Types.ObjectId, ref: "Theater" },
  method: { type: String, required: true },
});

// Create a compound unique index
actSchema.index({ name: 1, endPoint: 1, theaterId: 1, method: 1 }, { unique: true });

// Create and export the model
const ActModel = model<ActDocument>("Act", actSchema);

export default ActModel;
