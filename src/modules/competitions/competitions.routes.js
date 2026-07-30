import express from "express";
import * as controller from "./competitions.controller.js";

import verifyToken from "../../middlewares/verifyToken.js";
import verifyAdmin from "../../middlewares/verifyAdmin.js";

// 1. Import the validation helper and validation rule
import { validate } from "../../middlewares/validate.js";
import { createCompetitionSchema } from "./competitions.validation.js";

const router = express.Router();

router.get("/", controller.getCompetitions);

router.get("/:id", controller.getCompetition);

// 2. Added validation middleware right before the controller executes
router.post(
  "/",
  verifyToken,
  verifyAdmin,
  validate(createCompetitionSchema), // ← Validates input body before creating
  controller.createCompetition
);

router.patch(
  "/:id",
  verifyToken,
  verifyAdmin,
  controller.updateCompetition
);

router.delete(
  "/:id",
  verifyToken,
  verifyAdmin,
  controller.deleteCompetition
);

export default router;
