import * as authService from "./auth.service.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const createJwt = asyncHandler(async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    const error = new Error("Firebase ID token is required");
    error.statusCode = 400;
    throw error;
  }

  const result = await authService.createJwtService(idToken);

  res.json({
    success: true,
    token: result.token,
    role: result.role,
  });
});