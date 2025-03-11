import express from "express";
import * as productControllers from "../Controllers/productController.js";
import * as authMiddleware from "../Middlewares/authMiddleware.js";
import upload from "../Middlewares/uploadMiddleware.js";

const router = express.Router();

router.use(authMiddleware.protect);

router.get("/:id", productControllers.getOneProduct);

router.get("/", productControllers.getProduct);

router.post(
  "/",
  authMiddleware.restrictTo("admin"),
  upload.array("images"),
  productControllers.createProduct
);

router.patch("/:id", productControllers.updateProduct);

router.post("/:id/reviews", productControllers.addReview);

export default router;
