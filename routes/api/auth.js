const express = require("express");
const { registerSchema, loginSchema } = require("../../schemas");
const { validate, authenticate, upload } = require("../../middlewares");
const { register, login, logout, updateAvatar } = require("../../controllers");
const { getCurrentUser, updateSubscription } = require("../../controllers");
const router = express.Router();

router.post("/register", validate(registerSchema), register);

router.post("/login", validate(loginSchema), login);

router.post("/logout", authenticate, logout);

router.get("/current", authenticate, getCurrentUser);

router.patch("/subscription", authenticate, updateSubscription);

router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

module.exports = router;
