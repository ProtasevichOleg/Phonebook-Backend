const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers");
const { UserModel } = require("../models");
const { JWT_SECRET } = process.env;

const register = async (req, res, next) => {
  try {
    const { email, password, subscription } = req.body;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      throw new HttpError(409, "Email in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({
      email,
      password: hashedPassword,
      subscription,
    });
    const payload = { userId: newUser._id };
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "23h",
    });

    res.status(201).json({
      token,
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
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
    const payload = { userId: user._id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
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

const logout = async (req, res, next) => {
  const { _id } = req.user;
  try {
    await UserModel.findByIdAndUpdate(_id, { token: "" });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({ email, subscription });
};

const updateSubscription = async (req, res, next) => {
  try {
    const { subscription } = req.body;
    const user = await UserModel.findByIdAndUpdate(
      req.user._id,
      { subscription },
      { new: true }
    );
    if (!user) {
      throw new HttpError(404, "User not found");
    }
    res.json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
  updateSubscription,
};
