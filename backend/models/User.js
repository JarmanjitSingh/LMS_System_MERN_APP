import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import { compare, hash } from "bcrypt";
import crypto from "crypto"; //this is inbuilt module from node

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: validator.isEmail,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [6, "Password must be at least 6 characters"],
    select: false,
  },
  role: {
    type: String,
    enum: ["admin", "user"], //enum means it has only these predefined values
    default: "user",
  },
  subscription: {
    id: String,
    status: String,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  playlist: [
    {
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
      poster: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: String,
});

//we are creating a all user methods below
schema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
};

schema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await hash(this.password, 10);
  next();
});

schema.methods.comparePassword = async function (password) {
  return await compare(password, this.password);
};

schema.methods.getResetToken = async function () {
  const resetToken = crypto.randomBytes(20).toString("hex");


  this.resetPasswordToken = crypto 
    .createHash("sha256")
    .update(resetToken)
    .digest("hex"); //we are setting users resetPassword token in schema

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // and seting expire schema for reset password 15min 

  return resetToken;
};


export const User = mongoose.model("User", schema);
