import jwt from "jsonwebtoken";
import User from "../Models/userModel.js";
import AppError from "../Utils/appError.js";
import * as statusCode from "../Constants/httpStatusCode.js";
import { catchAsync } from "../Utils/catchAsync.js";

export const protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("Not authorized", statusCode.UNAUTHORIZED));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
});

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.userType)) {
      return next(
        new AppError(
          "You do not have permission to perform this action",
          statusCode.FORBIDDEN
        )
      );
    }
    next();
  };
};
