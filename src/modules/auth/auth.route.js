import express from "express";
import { createJwt } from "./auth.controller.js";

const router = express.Router();

router.post("/jwt", createJwt);

export default router;