// Verse
import { Schema, model, Document } from "mongoose";

// Define the interface for the document
export interface VerseDocument extends Document {
  name: string;
  response: string;
  httpCode: number;
  responseType: string;
  actId: Schema.Types.ObjectId;
  isActive?: boolean;
}

// Define the schema
const verseSchema = new Schema<VerseDocument>({
  name: { type: String, required: true },
  response: { type: String, required: true },
  responseType: { type: String, required: true },
  httpCode: { type: Number, required: true },
  isActive: { type: Boolean },
  actId: { type: Schema.Types.ObjectId, ref: "Act" },
});

// Create the model
const VerseModal = model<VerseDocument>("Verse", verseSchema);

//  export model
export default VerseModal;
