import express from "express";
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
  const updated = await Chat.findByIdAndUpdate(req.params.id, { title: req.body.title }, { new: true });
  res.json(updated);
});

// delete (move to trash)
router.delete("/:id", async (req, res) => {
  const chat = await Chat.findByIdAndUpdate(req.params.id, { deleted: true }, { new: true });
  res.json(chat);
});

// restore from trash
router.patch("/:id/restore", async (req, res) => {
  const chat = await Chat.findByIdAndUpdate(req.params.id, { deleted: false }, { new: true });
  res.json(chat);
});

// delete permanently
router.delete("/:id/permanent", async (req, res) => {
  await Chat.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted permanently" });
});

export default router;
