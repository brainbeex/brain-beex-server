import express from "express";
import * as userController from "./user.controller.js";
import verifyToken from "../../middlewares/verifyToken.js";
import verifyAdmin from "../../middlewares/verifyAdmin.js";

import { validate } from "../../middlewares/validate.js";
import { createUserSchema } from "./user.validation.js";

const router = express.Router();

router.post("/", validate(createUserSchema), userController.createUser);
router.get("/", userController.getUsers);

router.get(
  "/all-users",
  verifyToken,
  verifyAdmin,
  userController.getUsers
);

router.get("/:id", userController.getUser);

export default router;