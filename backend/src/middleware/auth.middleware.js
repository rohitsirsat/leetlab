import jwt from "jsonwebtoken";
import { db } from "../libs/db.js";
import { ApiError } from "../utils/api-error.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({
        message: "Unauthorized - Invalid token",
      });
    }

    const user = await db.user.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        image: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      throw new ApiError(401, "User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(500).json({ message: "Error authenticating user" });
  }
};
