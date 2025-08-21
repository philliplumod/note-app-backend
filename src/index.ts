import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/database";
import { errorHandler } from "./middlewares/error.middleware";
import noteRoutes from "./routes/note.routes";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.route";
// Load environment variables
dotenv.config();

// Create Express application
const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root Route
app.get("/", (_req: Request, res: Response) => {
  res.send("Welcome to the Notes API!");
});

// API Routes
app.use("/api/notes", noteRoutes);
app.use("/api/users", userRoutes);
app.use("/api/login", authRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

// Start server and connect to database
const startServer = async (): Promise<void> => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
