import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import TokenBlacklist from "../models/token-blacklist.model";

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: { userId: string; email: string };
      token?: string; // Add token to request object
    }
  }
}

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please provide a valid token.",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is missing",
      });
    }

    try {
      // Check if token is blacklisted
      const isBlacklisted = await TokenBlacklist.findOne({ token });
      if (isBlacklisted) {
        return res.status(401).json({
          success: false,
          message: "Token has been invalidated",
        });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
        userId: string;
        email: string;
      };

      // Add user info and token to request object
      req.user = decoded;
      req.token = token;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Authentication failed",
    });
  }
};
