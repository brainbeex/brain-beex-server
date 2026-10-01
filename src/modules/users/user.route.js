import express from "express";
import * as userController from "./user.controller.js";
import verifyToken from "../../middlewares/verifyToken.js";
import verifyAdmin from "../../middlewares/verifyAdmin.js";

import { validate } from "../../middlewares/validate.js";
import { createUserSchema } from "./user.validation.js";

const router = express.Router();

// router.post("/", validate(createUserSchema), userController.createUser);
router.post(
  "/", 
  verifyToken,                 // ← Intercepts and requires application authentication first
  validate(createUserSchema), 
  userController.createUser
);

// Secured endpoint restricted to administrators for listing system members
router.get(
  "/all-users",
  verifyToken,
  verifyAdmin,
  userController.getUsers
);

router.get(
  "/:id",
  verifyToken, 
  userController.getUser);

export default router;