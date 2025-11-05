import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: String,
  text: String,
  timestamp: { type: Date, default: Date.now },
});

const chatSchema = new mongoose.Schema({
  title: { type: String, required: true },
  messages: [messageSchema],
  deleted: { type: Boolean, default: false },
});

export default mongoose.model("Chat", chatSchema);
