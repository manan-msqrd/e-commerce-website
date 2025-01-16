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
exports.getUserCart = exports.updateCart = exports.addToCart = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, itemId, size } = req.body;
        // Validate required fields
        if (!userId || !itemId || !size) {
            res.status(400).json({ success: false, message: "Missing required fields: userId, itemId, or size" });
            return;
        }
        const userData = yield userModel_1.default.findById(userId);
        if (!userData) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        let cartData = userData.cartData || {};
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        yield userModel_1.default.findByIdAndUpdate(userId, { cartData });
        res.status(200).json({ success: true, message: "Successfully added to cart" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message || "Server error" });
    }
});
exports.addToCart = addToCart;
const updateCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, itemId, size, quantity } = req.body;
        // Validate required fields
        if (!userId || !itemId || !size || quantity === undefined) {
            res.status(400).json({ success: false, message: "Missing required fields: userId, itemId, size, or quantity" });
            return;
        }
        const userData = yield userModel_1.default.findById(userId);
        if (!userData) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        let cartData = yield userData.cartData;
        cartData[itemId][size] = quantity;
        yield userModel_1.default.findByIdAndUpdate(userId, { cartData });
        res.status(200).json({ success: true, message: "Successfully updated cart" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message || "Server error" });
    }
});
exports.updateCart = updateCart;
const getUserCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        // Validate required fields
        if (!userId) {
            res.status(400).json({ success: false, message: "Missing required field: userId" });
            return;
        }
        const userData = yield userModel_1.default.findById(userId);
        if (!userData) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        let cartData = yield userData.cartData;
        res.status(200).json({ success: true, cartData });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message || "Server error" });
    }
});
exports.getUserCart = getUserCart;
