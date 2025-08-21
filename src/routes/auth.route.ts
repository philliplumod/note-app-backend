import { Router } from "express";
import { loginUser } from "../controllers/auth.controller";
const router = Router();

// POST /api/auth/login - Login user
router.post("/", loginUser);

export default router;
