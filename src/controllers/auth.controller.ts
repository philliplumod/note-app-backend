import { Request, Response } from "express";
import User from "../models/user.model";
import TokenBlacklist from "../models/token-blacklist.model";
import jwt from "jsonwebtoken";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const { email, password } = user;

    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const isPasswordValid = existingUser.password === password;
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const token = jwt.sign(
      { userId: existingUser._id, email: existingUser.email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({
      success: true,
      message: "Login successful",
      token: token,
      user: {
        user_id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  try {
    const token = req.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    // Add token to blacklist
    await TokenBlacklist.create({ token });

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};
