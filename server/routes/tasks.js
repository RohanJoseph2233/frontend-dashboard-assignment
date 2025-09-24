import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Task from "../models/Task.js";

const router = express.Router();




// Middleware: verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    req.userId = decoded.id;
    next();
  });
};

router.use(verifyToken);

// GET /api/tasks
router.get("/", async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  res.json(tasks);
});

// POST /api/tasks
router.post("/", async (req, res) => {
  const task = await Task.create({ title: req.body.title, userId: req.userId });
  res.json(task);
});

// PUT /api/tasks/:id
router.put("/:id", async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    { title: req.body.title },
    { new: true }
  );
  res.json(task);
});

// DELETE /api/tasks/:id
router.delete("/:id", async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  res.json({ message: "Task deleted" });
});

export default router;

