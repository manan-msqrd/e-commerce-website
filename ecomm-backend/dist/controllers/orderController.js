"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatus = exports.userOrders = exports.allOrders = exports.placeOrderRazorpay = exports.placeOrderStripe = exports.placeOrder = void 0;
const orderModel_1 = __importDefault(require("../models/orderModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const placeOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, amount, items, address } = req.body;
        console.log("items", items);
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        };
        const newOrder = new orderModel_1.default(orderData);
        yield newOrder.save();
        yield userModel_1.default.findByIdAndUpdate(userId, { cartData: {} });
        res.json({ success: true, message: "Order Placed" });
    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
});
exports.placeOrder = placeOrder;
const placeOrderStripe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
});
exports.placeOrderStripe = placeOrderStripe;
const placeOrderRazorpay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
});
exports.placeOrderRazorpay = placeOrderRazorpay;
const allOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = orderModel_1.default.find({});
        res.json({ success: true, orders });
    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
});
exports.allOrders = allOrders;
const userOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        // Execute the query to fetch the actual data
        const orders = yield orderModel_1.default.find({ userId });
        res.json({ success: true, orders });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.userOrders = userOrders;
const updateOrderStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId, status } = req.body;
        yield orderModel_1.default.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, message: 'Status Updated'
        });
    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
});
exports.updateOrderStatus = updateOrderStatus;
