import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Users from "../Models/userModel.js";
import sendEmail from "../Utils/email.js";
import { catchAsync } from "../Utils/catchAsync.js";
import AppError from "../Utils/appError.js";

export const register = catchAsync(async (req, res) => {
  const { name, email, password, userType } = req.body;

  const user = await Users.findOne({ email });

  if (user) {
    return new AppError("Email already exixts ", 400);
  }

  const hashedPassword = await bcrypt.hash(password.trim(), 10);

  const newUser = await Users.create({
    name,
    email,
    password: hashedPassword,
    userType,
  });

  res.status(201).json({
    success: "success",
    message: "User registered successfully",
    data: {
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        userType: newUser.userType,
      },
    },
  });
});

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email });

  if (!user) {
    return new AppError("Invalid email", 400);
  }

  if (!password || !user.password) {
    return new AppError("Password is required", 400);
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return new AppError("Invalid password", 400);
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(201).json({
    success: true,
    message: "Login successful",
    token,
  });
});

export const forgetPassword = catchAsync(async (req, res) => {
  const { email } = req.body;
  const user = await Users.findOne({ email });
  if (!user) {
    return new AppError("User not Found", 404);
  }

  const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "10m",
  });

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/auth/reset-password/${resetToken}`;

  await sendEmail({
    email: user.email,
    subject: "Password Reset",
    message: `Your token is valid for 10 min only.\nReset your password by clicking here: ${resetUrl}`,
  });

  res
    .status(200)
    .json({ success: true, message: "Password reset link sent to email" });
});

export const resetPassword = catchAsync(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await Users.findById(decoded.id);
  if (!user) {
    return new AppError("User not Found", 404);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  user.password = hashedPassword;
  await user.save();

  res
    .status(200)
    .json({ success: true, message: "Password reset successfully" });
});
