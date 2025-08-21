import { Router } from "express";
import { createNote, getNotes } from "../controllers/note.controller";
import { authenticateUser } from "../middlewares/auth.middleware";

const router = Router();

// Protected routes - require authentication
router.use(authenticateUser);

// GET /api/notes - Get all notes
router.get("/", getNotes);
// POST /api/notes - Create a new note
router.post("/", createNote);

export default router;
