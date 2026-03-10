import express from "express";
import * as applicationController from "./applications.controller.js";
import verifyToken from "../../middlewares/verifyToken.js";
import verifyAdmin from "../../middlewares/verifyAdmin.js";

const router = express.Router();

router.post(
  "/",
  verifyToken,
  applicationController.createApplication
);

router.get(
  "/my",
  verifyToken,
  applicationController.getMyApplications
);

router.get(
  "/",
  verifyToken,
  verifyAdmin,
  applicationController.getAllApplications
);

router.patch(
  "/:id",
  verifyToken,
  verifyAdmin,
  applicationController.updateApplicationStatus
);

router.delete(
  "/:id",
  verifyToken,
  verifyAdmin,
  applicationController.deleteApplication
);

export default router;