import express from "express";
import * as authController from "./auth.controller.js";

// Import your global validation middleware and the Zod schema
import { validate } from "../../middlewares/validate.js";
import { createJwtSchema } from "./auth.validation.js";

const router = express.Router();

// The validation interceptor processes data formats before passing it downstream
router.post(
  "/jwt",
  validate(createJwtSchema),
  authController.createJwt
);

export default router;
