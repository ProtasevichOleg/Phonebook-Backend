const handleMongooseError = require("../middlewares/handleMongooseError");
const { Schema, model } = require("mongoose");

const { NAME_REGEX, EMAIL_REGEX } = require("../helpers");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      match: [
        NAME_REGEX,
        "Name can only include letters, numbers, underscores, hyphens, and periods. It cannot begin or end with a hyphen or a period",
      ],
      minlength: [6, "Name must be at least 6 characters long"],
      maxlength: [30, "Name must not be more than 30 characters long"],
      unique: true,
    },
    email: {
      type: String,
      match: EMAIL_REGEX,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    avatarURL: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: "",
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const UserModel = model("user", userSchema);

module.exports = UserModel;
