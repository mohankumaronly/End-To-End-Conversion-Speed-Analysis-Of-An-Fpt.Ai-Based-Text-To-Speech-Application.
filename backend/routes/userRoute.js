// routes/userRoutes.js
import express from "express";
import {
  changePassword,
  forgotPassword,
  loginUser,
  logoutUser,
  registerUser,
  verification,
  verifyOTP
} from "../controllers/userController.js";

import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { userSchema, validateUser } from "../validators/userValidate.js";

// import tts controller
import { generateTTS, getTTSHistory } from "../controllers/ttsController.js";

const router = express.Router();

router.post('/register', validateUser(userSchema), registerUser);
router.post('/verify', verification);
router.post('/login', loginUser);
router.post('/logout', isAuthenticated, logoutUser);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp/:email', verifyOTP);
router.post('/change-password/:email', changePassword);

// NEW: protected TTS generation endpoint
// Content-Type: text/plain with body = the text to synthesize
// Optional headers: "voice" and "speed"
router.post('/tts/generate', isAuthenticated, express.text({ type: "text/*" }), generateTTS);

router.get('/tts/history', isAuthenticated, getTTSHistory);

export default router;
