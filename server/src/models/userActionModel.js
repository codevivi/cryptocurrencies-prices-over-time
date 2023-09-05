import mongoose from "mongoose";

const userActionSchema = new mongoose.Schema({
  searchType: {
    required: true,
    type: String,
  },
  currency: {
    required: true,
    type: String,
  },
});
export default mongoose.model("UserAction", userActionSchema);
