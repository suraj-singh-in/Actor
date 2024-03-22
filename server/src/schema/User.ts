// actModel.ts
import { Schema, model, Document } from "mongoose";
import { RoleDocument } from "./Role";

// Define the interface for the document
export interface UserDocument extends Document {
  name: string;
  userName: string;
  hash: string;
  salt: string;
  roleList: Array<string | RoleDocument>;
}

// Define the schema
const userSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  hash: { type: String, required: true },
  salt: { type: String, required: true },
  roleList: [{ type: Schema.Types.ObjectId, ref: "Role", required: true }],
});

userSchema.index({ userName: 1 }, { unique: true });

// Create and export the model
const UserModel = model<UserDocument>("User", userSchema);

export default UserModel;
