import express from "express";
import {
  register,
  login,
  logout,
  getProfile,
} from "../controllers/auth.controllers.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const authRoutes = express.Router();

authRoutes.post("/register", register);

authRoutes.post("/login", login);

authRoutes.post("/logout", authMiddleware, logout);

authRoutes.get("/me", authMiddleware, getProfile);

export default authRoutes;
