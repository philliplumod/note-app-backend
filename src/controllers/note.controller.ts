import { Request, Response } from "express";
import Note from "../models/note.model";

export const createNote = async (req: Request, res: Response) => {
  try {
    const note = await Note.create({
      ...req.body,
      user: req.user?.userId, // Add the authenticated user's ID
    });
    res.status(201).json({
      success: true,
      data: note,
    });
  } catch (error: unknown) {
    res.status(400).json({
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};

export const getNotes = async (req: Request, res: Response) => {
  try {
    // Only return notes that belong to the authenticated user
    const notes = await Note.find({ user: req.user?.userId });
    res.status(200).json({
      success: true,
      data: notes,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};
