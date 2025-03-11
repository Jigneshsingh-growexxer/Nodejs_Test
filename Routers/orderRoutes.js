import express from "express";
import * as orderControllers from "../Controllers/orderController.js";
import * as authMiddleware from "../Middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware.protect);

router.post("/", orderControllers.placeOrder);
router.get("/:id", orderControllers.getOrderDetails);
router.get("/", orderControllers.getAllOrders);
router.patch("/:id", orderControllers.updateOrderStatus);

export default router;
