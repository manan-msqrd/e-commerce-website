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
        // Validate required fields
        if (!userId || !amount || !items || !address) {
            res.status(400).json({ success: false, message: "Missing required fields: userId, amount, items, or address" });
            return;
        }
        // Check if user exists
        const user = yield userModel_1.default.findById(userId);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
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
        res.status(201).json({ success: true, message: "Order placed successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message || "Server error" });
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
        const orders = yield orderModel_1.default.find({});
        res.status(200).json({ success: true, orders });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message || "Server error" });
    }
});
exports.allOrders = allOrders;
const userOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        // Validate required field
        if (!userId) {
            res.status(400).json({ success: false, message: "Missing required field: userId" });
            return;
        }
        const orders = yield orderModel_1.default.find({ userId });
        res.status(200).json({ success: true, orders });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message || "Server error" });
    }
});
exports.userOrders = userOrders;
const updateOrderStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId, status } = req.body;
        if (!orderId || !status) {
            res.status(400).json({ success: false, message: "Missing required fields: orderId or status" });
            return;
        }
        const order = yield orderModel_1.default.findByIdAndUpdate(orderId, { status }, { new: true });
        if (!order) {
            res.status(404).json({ success: false, message: "Order not found" });
            return;
        }
        res.status(200).json({ success: true, message: "Order status updated successfully", order });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message || "Server error" });
    }
});
exports.updateOrderStatus = updateOrderStatus;
