import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import jwt from "jsonwebtoken";

export const userRegister = async (req: Request, res: Response) => {
  try {
    if (await User.findOne({ email: req.body.email })) {
      
      return res.status(400).json({
        message: "User already exists",
      });
    }
    if (await User.findOne({ username: req.body.username })) {
    
      return res.status(400).json({
        message: "Username already taken",
      });
    }
    const salt = await bcrypt.genSalt(10); 
    const hashedPassword = await bcrypt.hash(req.body.password, salt); 
    const newuser = new User({
  
      avatar_url: req.body.avatar_url,
      email: req.body.email,
      password: hashedPassword,
      username: req.body.username,
      status: req.body.status,
      user_type: req.body.user_type,
    });

    await newuser.save(); 
    const token = jwt.sign(
      { id: newuser._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    ); 
    res.status(201).json({
      token,
      newuser,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "something went wrong",
      error: error.message,
    });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { password, email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "The user does not exist",
      });
    }
    
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
     return res.status(401).json({
        message: "Invalid Password",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
    res.status(200).json({
      token,
      message: "Logged in successfully",
    });
  } catch (err: any) {
    res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};
