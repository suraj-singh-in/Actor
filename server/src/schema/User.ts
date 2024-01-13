// actModel.ts
import { Schema, model, Document } from "mongoose";

// Define the interface for the document
export interface UserDocument extends Document {
  name: string;
  userName: string;
  hash: string;
  salt: string;
}

// Define the schema
const userSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  hash: { type: String, required: true },
  salt: { type: String, required: true },
});

// Create and export the model
const UserModel = model<UserDocument>("User", userSchema);

export default UserModel;
