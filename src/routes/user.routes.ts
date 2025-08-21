import { Router } from "express";
import { createUser, getUsers } from "../controllers/user.controller";

const router = Router();

// POST /api/users - Create a new user and GET /api/users - Get all users
router.post("/", createUser);
router.get("/", getUsers);

export default router;
