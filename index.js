import express from "express";
import connectDb from "./Databases/db.js";
import productRoutes from "./Routers/productRoutes.js";
import orderRoutes from "./Routers/orderRoutes.js";
import authRoutes from "./Routers/authRoutes.js";
import dotenv from "dotenv";
import globalErrorHandler from "./Middlewares/errorMiddleware.js";
import AppError from "./Utils/appError.js";

dotenv.config({
  path: "./config.env",
});

connectDb();
const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);
