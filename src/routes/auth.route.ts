import { Router } from "express";
import { loginUser, logoutUser } from "../controllers/auth.controller";
import { authenticateUser } from "../middlewares/auth.middleware";

const router = Router();

// POST /api/auth/login - Login user
router.post("/login", loginUser);

// POST /api/auth/logout - Logout user (protected route)
router.post("/logout", authenticateUser, logoutUser);
export default router;
