import express from "express";
import mongoose from "mongoose";
import Chat from "../models/Chat.js";
const router = express.Router();

// get all active chats
router.get("/", async (req, res) => {
  const chats = await Chat.find({ deleted: false });
  res.json(chats);
});

// get deleted chats
router.get("/deleted", async (req, res) => {
  const chats = await Chat.find({ deleted: true });
  res.json(chats);
});

// create new chat
router.post("/", async (req, res) => {
  const chat = await Chat.create({ title: req.body.title || "New Chat" });
  res.json(chat);
});

// rename chat
router.patch("/:id", async (req, res) => {
  const { id } = req.params;

  // If it's not a valid ObjectId, just skip DB update
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(200).json({ _id: id, title: req.body.title });
  }

  const updated = await Chat.findByIdAndUpdate(
    id,
    { title: req.body.title },
    { new: true }
  );
  res.json(updated);
});

// delete (move to trash)
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  // If it's a temporary (local-only) chat, just respond success
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(200).json({ _id: id, deleted: true });
  }

  const chat = await Chat.findByIdAndUpdate(id, { deleted: true }, { new: true });
  res.json(chat);
});

// restore from trash
router.patch("/:id/restore", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(200).json({ _id: id, deleted: false });
  }

  const chat = await Chat.findByIdAndUpdate(id, { deleted: false }, { new: true });
  res.json(chat);
});

// delete permanently
router.delete("/:id/permanent", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(200).json({ message: "Local chat removed permanently" });
  }

  await Chat.findByIdAndDelete(id);
  res.json({ message: "Deleted permanently" });
});

// 🟢 Add a new message to a chat
router.post("/:id/messages", async (req, res) => {
  const { id } = req.params;
  const { sender, text } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid chat ID" });
  }

  try {
    const chat = await Chat.findById(id);
    if (!chat) return res.status(404).json({ message: "Chat not found" });

    chat.messages.push({ sender, text });
    await chat.save();
    res.json(chat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving message" });
  }
});

// add message to a chat
router.post("/:id/messages", async (req, res) => {
  const { id } = req.params;
  const { sender, text } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(200).json({ _id: id, message: "Temporary chat" });
  }

  const chat = await Chat.findById(id);
  if (!chat) return res.status(404).json({ message: "Chat not found" });

  chat.messages.push({ sender, text });
  await chat.save();

  res.json(chat);
});


export default router;

