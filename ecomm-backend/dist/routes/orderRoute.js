"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../controllers/orderController");
const auth_1 = require("../middleware/auth");
const adminAuth_1 = __importDefault(require("../middleware/adminAuth"));
const orderRouter = express_1.default.Router();
//Admin features
orderRouter.post('/list', adminAuth_1.default, orderController_1.allOrders);
orderRouter.post('/status', adminAuth_1.default, orderController_1.updateOrderStatus);
//Payment features
orderRouter.post('/place', auth_1.authUser, orderController_1.placeOrder);
orderRouter.post('/stripe', auth_1.authUser, orderController_1.placeOrderStripe);
orderRouter.post('/razorpay', auth_1.authUser, orderController_1.placeOrderRazorpay);
//User Feature
orderRouter.get('/userorders', auth_1.authUser, orderController_1.userOrders);
exports.default = orderRouter;
