const express = require("express");
const { registerSchema, loginSchema } = require("../../schemas");
const { validate, ctrlWrapper, authenticate } = require("../../middlewares");
const { register, login, logout } = require("../../controllers");
const { getCurrentUser, updateSubscription } = require("../../controllers");
const router = express.Router();

router.post(
  "/register",
  validate(registerSchema),
  ctrlWrapper((req, res, next) => {
    register(req, res, next);
  })
);

router.post(
  "/login",
  validate(loginSchema),
  ctrlWrapper((req, res, next) => {
    login(req, res, next);
  })
);

router.post("/logout", authenticate, ctrlWrapper(logout));

router.get("/current", authenticate, ctrlWrapper(getCurrentUser));

router.patch("/subscription", authenticate, ctrlWrapper(updateSubscription));

module.exports = router;
