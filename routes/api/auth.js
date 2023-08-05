const express = require("express");
const {
  registerSchema,
  loginSchema,
  resendVerificationSchema,
} = require("../../schemas");
const { validate, authenticate, upload } = require("../../middlewares");
const {
  register,
  verifyEmail,
  resendVerifyEmail,
  login,
  logout,
  getCurrentUser,
  updateSubscription,
  updateAvatar,
} = require("../../controllers");
const router = express.Router();

router.post("/register", validate(registerSchema), register);

router.get("/verify/:verificationToken", verifyEmail);

router.post("/verify", validate(resendVerificationSchema), resendVerifyEmail);

router.post("/login", validate(loginSchema), login);

router.post("/logout", authenticate, logout);

router.get("/current", authenticate, getCurrentUser);

router.patch("/subscription", authenticate, updateSubscription);

router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

module.exports = router;
