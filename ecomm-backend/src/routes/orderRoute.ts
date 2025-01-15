import express from "express"
import { placeOrder, placeOrderRazorpay, placeOrderStripe, allOrders, updateOrderStatus, userOrders } from "../controllers/orderController"
import { authUser } from "../middleware/auth";
import adminAuth from "../middleware/adminAuth";

const orderRouter = express.Router();

//Admin features
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateOrderStatus);

//Payment features
orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/stripe', authUser, placeOrderStripe);
orderRouter.post('/razorpay', authUser, placeOrderRazorpay);

//User Feature
orderRouter.get('/userorders', authUser, userOrders);

export default orderRouter
