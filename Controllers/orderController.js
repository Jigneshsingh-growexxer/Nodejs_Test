import {
  BAD_REQUEST,
  CREATED,
  NOT_FOUND,
  OK,
} from "../Constants/httpStatusCode.js";
import { ORDER_PLACED, ORDER_UPDATED } from "../Constants/responseMessage.js";
import Order from "../Models/orderModel.js";
import Product from "../Models/productModel.js";
import { catchAsync } from "../Utils/catchAsync.js";
import AppError from "../Utils/appError.js";

export const getOrderDetails = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new AppError("Order not found", NOT_FOUND));
  }
  res.status(OK).json({
    success: true,
    data: {
      products: order.products,
      totalPrice: order.totalPrice,
    },
  });
});

export const placeOrder = catchAsync(async (req, res, next) => {
  const { products } = req.body;
  const user = req.user;

  let totalPrice = 0;
  for (const item of products) {
    const product = await Product.findById(item.productId);
    if (!product) {
      return next(new AppError(`Product not found`, NOT_FOUND));
    }
    if (product.stock < item.quantity) {
      return next(
        new AppError(
          `Insufficient stock for product ${product.name}`,
          BAD_REQUEST
        )
      );
    }
    totalPrice += product.price * item.quantity;
    product.stock -= item.quantity;
    await product.save();
  }

  const order = await Order.create({
    userId: user._id,
    userName: user.name,
    userEmail: user.email,
    products,
    totalPrice,
  });

  res.status(CREATED).json({
    success: true,
    message: ORDER_PLACED,
    data: order,
  });
});

export const updateOrderStatus = catchAsync(async (req, res, next) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  if (!order) {
    return next(new AppError("Order not found", NOT_FOUND));
  }

  res.status(OK).json({
    success: true,
    message: ORDER_UPDATED,
    data: order,
  });
});

export const getAllOrders = catchAsync(async (req, res, next) => {
  // Filtering by status
  const { status } = req.query;
  const filter = status ? { status } : {};

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  // Query the database
  const orders = await Order.find(filter)
    .populate("products.productId")
    .skip(skip)
    .limit(limit);

  if (!orders) {
    return next(new AppError("Order not found", NOT_FOUND));
  }

  res.status(OK).json({
    success: true,
    results: orders.length,
    data: orders,
  });
});
