import express from "express";
import authController from "../controllers/authController.js";

const router = express.Router();

router.post("/login", authController.login);
router.post("/check-session", authController.checkSession);
router.post("/update-contact", authController.updateContact);

export default router;
