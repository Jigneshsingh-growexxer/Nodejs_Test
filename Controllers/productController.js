import { catchAsync } from "../Utils/catchAsync.js";
import Product from "../Models/productModel.js";
import * as statusCode from "../Constants/httpStatusCode.js";
import * as message from "../Constants/responseMessage.js";
import AppError from "../Utils/appError.js";
import Review from "../Models/reviewModel.js";

export const getOneProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product)
    return next(new AppError("Product not found", statusCode.NOT_FOUND));
  res.status(statusCode.OK).json({ success: true, data: product });
});
export const getProduct = catchAsync(async (req, res, next) => {
  // Filtering
  const { category } = req.query;
  const filter = category ? { category } : {};

  // Sorting: /api/products?sort=-price
  const sortBy = req.query.sort === "price" ? "price" : "-price";

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  // Query the database
  const products = await Product.find(filter)
    .sort(sortBy)
    .skip(skip)
    .limit(limit);

  if (!products) {
    return next(new AppError("Order not found", statusCode.NOT_FOUND));
  }

  // Calculate average rating for each product
  const productsWithRating = products.map((product) => ({
    ...product.toObject(),
    averageRating: product.averageRating,
  }));

  res.status(statusCode.OK).json({
    success: true,
    results: productsWithRating.length,
    data: productsWithRating,
  });
});

export const createProduct = catchAsync(async (req, res, next) => {
  const { name, description, price, category, stock } = req.body;
  const images = req.files.map((file) => file.filename);

  const product = await Product.create({
    name,
    description,
    price,
    category,
    stock: parseInt(stock),
    images,
  });

  if (!product) {
    return next(new AppError("Order not found", statusCode.NOT_FOUND));
  }

  res.status(statusCode.CREATED).json({
    success: true,
    message: message.PRODUCT_ADDED,
    data: product,
  });
});

export const updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!product) {
    return next(new AppError("Product not found", statusCode.NOT_FOUND));
  }

  res.status(statusCode.OK).json({
    success: true,
    message: message.PRODUCT_UPDATED,
    data: product,
  });
});

export const addReview = catchAsync(async (req, res) => {
  const { rating, comment } = req.body;

  const review = await Review.create({
    product: req.params.id,
    rating,
    comment,
  });

  await Product.findByIdAndUpdate(req.params.id, {
    $push: { reviews: review._id },
  });

  res.status(statusCode.CREATED).json({
    success: true,
    message: message.REVIEW_ADDED,
    data: review,
  });
});
