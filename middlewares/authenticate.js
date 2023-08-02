const jwt = require("jsonwebtoken");
const { UserModel } = require("../models");
const { HttpError } = require("../helpers");
const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization") || "";
    const [bearer, token] = authorizationHeader.split(" ");
    if (bearer !== "Bearer" || !token) {
      throw new HttpError(401);
    }
    let userId;
    try {
      userId = jwt.verify(token, JWT_SECRET).userId;
    } catch (err) {
      throw new HttpError(401);
    }
    const user = await UserModel.findById(userId);
    if (!user || token !== user.token) {
      throw new HttpError(401);
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = authenticate;
