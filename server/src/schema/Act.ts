// userModel.js
import { Schema, model } from "mongoose";

const actSchema = new Schema({
  name: { type: String, required: true },
});

module.exports = model("Act", actSchema);
