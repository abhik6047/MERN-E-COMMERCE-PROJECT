import express from "express";
import {
	allOrders,
	placeOrder,
	placeOrderRazorpay,
	placeOrderStripe,
	updateOrderStatus,
	userOrders,
	verifyStripe,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateOrderStatus);

orderRouter.post("/place-order", authUser, placeOrder);
orderRouter.post("/place-order/stripe", authUser, placeOrderStripe);
orderRouter.post("/place-order/verifyStripe", authUser, verifyStripe);
orderRouter.post("/place-order/razorpay", authUser, placeOrderRazorpay);

orderRouter.post("/userOrders", authUser, userOrders);

export default orderRouter;
