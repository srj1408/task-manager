import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
    const {name, email, password} = req.body;
    const hashedPwd = await bcrypt.hash(password, 10)
    const user = new User({name, email, password: hashedPwd});
    try{
        await user.save();
        res.status(201).json({message: "Registered successfully!"});
    }
    catch(error){
        res.status(400).json({message: "User already exists!"});
    }
});

router.post("/login", async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))){
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"});
        res.json({token});
    }
    else{
        res.status(401).json({error: "Invalid credentials!"});
    }
});

export default router;