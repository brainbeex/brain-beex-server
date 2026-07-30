import express from "express";
import { createJwt } from "./auth.controller.js";

import { validate } from "../../middlewares/validate.js";
import { loginSchema } from "./auth.validation.js";

const router = express.Router();

router.post(
  "/jwt", 
  validate(loginSchema),
  createJwt
);

export default router;