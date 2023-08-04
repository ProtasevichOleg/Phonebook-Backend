// authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../middlewares");
const { UserModel } = require("../models");
const { JWT_SECRET } = process.env;
const gravatar = require("gravatar");
const jimp = require("jimp");
const sharp = require("sharp");
const fs = require("fs/promises");
const path = require("path");

const register = ctrlWrapper(async (req, res, next) => {
  const { email, password, subscription } = req.body;

  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    throw new HttpError(409, "Email in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email, { s: "250", r: "pg", d: "mm" });
  const newUser = await UserModel.create({
    email,
    password: hashedPassword,
    subscription,
    avatarURL,
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
});

const login = ctrlWrapper(async (req, res, next) => {
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
});

const logout = ctrlWrapper(async (req, res, next) => {
  const { _id } = req.user;
  await UserModel.findByIdAndUpdate(_id, { token: "" });
  res.status(204).end();
});

const getCurrentUser = ctrlWrapper(async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({ email, subscription });
});

const updateSubscription = ctrlWrapper(async (req, res, next) => {
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
});

const updateAvatar = ctrlWrapper(async (req, res, next) => {
  const { file } = req;
  const { _id } = req.user;

  const isSupportedByJimp = (format) => {
    const supportedFormats = ["jpeg", "jpg", "png", "bmp", "tiff", "gif"];
    return supportedFormats.includes(format);
  };

  const fileExtension = path.extname(file.originalname).slice(1);
  let originalFilePath = null;
  if (!isSupportedByJimp(fileExtension)) {
    originalFilePath = file.path;
    const convertedFilePath = `${file.path}.png`;
    await sharp(file.path).toFile(convertedFilePath);
    file.path = convertedFilePath;
  }

  const img = await jimp.read(file.path);
  await img.resize(250, 250).writeAsync(file.path);

  const fileName = `${_id}${path.extname(file.path)}`;
  const newLocation = path.join("public", "avatars", fileName);
  await fs.rename(file.path, newLocation);

  if (originalFilePath) {
    await fs.unlink(originalFilePath);
  }

  const avatarURL = `/avatars/${fileName}`;
  await UserModel.findByIdAndUpdate(_id, { avatarURL });

  res.json({ avatarURL });
});

module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
  updateSubscription,
  updateAvatar,
};
