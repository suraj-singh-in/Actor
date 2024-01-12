// actModel.ts
import { Schema, model, Document } from "mongoose";

// Define the interface for the document
export interface ActDocument extends Document {
  name: string;
  theaterId: Schema.Types.ObjectId;
  endPoint: string;
}

// Define the schema
const actSchema = new Schema<ActDocument>({
  name: { type: String, required: true },
  endPoint: { type: String, required: true },
  theaterId: [{ type: Schema.Types.ObjectId, ref: "Book" }],
});

// Create and export the model
const ActModel = model<ActDocument>("Act", actSchema);

export default ActModel;
