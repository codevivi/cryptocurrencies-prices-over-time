import mongoose from "mongoose";

const userActionSchema = new mongoose.Schema({
  description: {
    required: true,
    type: String,
  },
  value: {
    required: false,
    type: String,
  },
});
export default mongoose.model("user-actions", userActionSchema);
