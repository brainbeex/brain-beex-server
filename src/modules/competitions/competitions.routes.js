import express from "express";
import * as controller from "./competitions.controller.js";

import verifyToken from "../../middlewares/verifyToken.js";
import verifyAdmin from "../../middlewares/verifyAdmin.js";

const router = express.Router();

router.get("/", controller.getCompetitions);

router.get("/:id", controller.getCompetition);

router.post(
  "/",
  verifyToken,
  verifyAdmin,
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