// Permission.ts
import { Schema, model, Document } from "mongoose";

// Define the interface for the document
export interface PermissionDocument extends Document {
  name: string;
  key: string;
  description: string;
}

// Define the schema
const permissionSchema = new Schema<PermissionDocument>({
  name: { type: String, required: true },
  key: { type: String, required: true },
  description: { type: String },
});

// Create and export the model
const PermissionModel = model<PermissionDocument>(
  "Permission",
  permissionSchema
);

export default PermissionModel;
