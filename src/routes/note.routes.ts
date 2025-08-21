import { Router } from "express";
import { createNote, getNotes } from "../controllers/note.controller";

const router = Router();

// GET /api/notes - Get all notes
router.get("/", getNotes);
// POST /api/notes - Create a new note
router.post("/", createNote);

export default router;
