const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers");
const { UserModel } = require("../models");

const register = async (req, res, next) => {
  try {
    const { email, password, subscription } = req.body;
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Subscription:", subscription);
    const existingUser = await UserModel.findOne({ email });
    console.log("Existing user:", existingUser);

    if (existingUser) {
      throw new HttpError(409, "Email in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({
      email,
      password: hashedPassword,
      subscription,
    });
    console.log("New user:", newUser);

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    console.log("Error during registration:", error);
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new HttpError(401, "Email or password is wrong");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new HttpError(401, "Email or password is wrong");
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    user.token = token;
    await user.save();

    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
