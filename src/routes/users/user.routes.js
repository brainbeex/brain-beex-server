import express from "express";
import * as userController from "../../controllers/users/user.controller.js";
import verifyToken from "../../middlewares/verifyToken.js";

const router = express.Router();

router.post("/", userController.createUser);
router.get("/", userController.getUsers);
router.get("/:id", userController.getUser);
router.get("/private", verifyToken, (req, res) => {
  res.json({ message: "You are authenticated", user: req.user });
});

export default router;