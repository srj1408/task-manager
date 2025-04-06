import express from "express";
import Task from "../models/task.js";
import jwt from "jsonwebtoken";

const router = express.Router();

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if(!token) res.status(401).json({ error: "Unauthorized!"});
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) res.status(403).json({ error: "Invalid Token!"});
        req.userId = decoded.userId;
        next();
    });
};

router.get("/", verifyToken, async (req, res) => {
    const tasks = await Task.find({user: req.userId});
    res.json(tasks);
});

router.post("/", verifyToken, async (req, res) => {
    const {title, description} = req.body;
    const newTask = new Task({title, description, user: req.userId});
    try{
        await newTask.save();
        res.status(201).json({ message: "Task created!"});
    }
    catch(err){
        res.status(400).json({ error: "Failed to create task!"});
    }
});

router.put("/:id", verifyToken, async (req, res) => {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {new:true});
    res.json(updatedTask);
});

router.delete("/:id", verifyToken, async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({message: "Task Deleted!"});
});

export default router;