// role.ts
import { Schema, model, Document } from "mongoose";

import { PermissionDocument } from "./Permission";

// Define the interface for the document
export interface RoleDocument extends Document {
  name: string;
  key: string;
  description: string;
  permissions: Array<string | PermissionDocument>;
}

// Define the schema
const roleSchema = new Schema<RoleDocument>({
  name: { type: String, required: true },
  key: { type: String, required: true },
  description: { type: String },
  permissions: [{ type: Schema.Types.ObjectId, ref: "Permission" }],
});

// Create and export the model
const RoleModel = model<RoleDocument>("Role", roleSchema);

export default RoleModel;
