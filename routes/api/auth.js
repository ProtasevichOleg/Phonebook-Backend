const express = require("express");
const { registerSchema, loginSchema } = require("../../schemas");
const { validate, ctrlWrapper } = require("../../middlewares");
const { register, login } =
  require("../../controllers");

const router = express.Router();

router.post(
  "/register",
  validate(registerSchema),
  ctrlWrapper((req, res, next) => {
    console.log('Виконання коду дійшло до роуту "/register"');
    register(req, res, next);
  })
);

router.post(
  "/login",
  validate(loginSchema),
  ctrlWrapper((req, res, next) => {
    console.log('Виконання коду дійшло до роуту "/login"');
    login(req, res, next);
  })
);

module.exports = router;
