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
exports.singleProduct = exports.removeProducts = exports.listProducts = exports.addProduct = void 0;
const cloudinary_1 = require("cloudinary");
const productModels_1 = __importDefault(require("../models/productModels"));
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, sizes, bestseller, price, category, subcategory } = req.body;
        // Validate required fields
        if (!name || !description || !sizes || !price || !category) {
            res.status(400).json({ success: false, message: "Missing required fields" });
            return;
        }
        const files = req.files;
        const image1 = files.image1 && files.image1[0];
        const image2 = files.image2 && files.image2[0];
        const image3 = files.image3 && files.image3[0];
        const image4 = files.image4 && files.image4[0];
        const images = [image1, image2, image3, image4].
            filter((image) => image !== undefined);
        let imageUrl = yield Promise.all(images.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            let result = yield cloudinary_1.v2.uploader.upload(item.path, { resource_type: 'image' });
            return result.secure_url;
        })));
        const productData = {
            name,
            description,
            category,
            subcategory,
            price: Number(price),
            bestseller: bestseller === "true" ? true : false,
            image: imageUrl,
            sizes: JSON.parse(sizes),
            date: Date.now()
        };
        const product = new productModels_1.default(productData);
        yield product.save();
        res.status(201).json({ success: true, message: "Product Added Successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message || "Server error" });
    }
});
exports.addProduct = addProduct;
const listProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productModels_1.default.find({});
        res.status(200).json({ success: true, products });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message || "Server error" });
    }
});
exports.listProducts = listProducts;
const removeProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    if (!id) {
        res.status(400).json({ success: false, message: "Product ID is required" });
        return;
    }
    try {
        const deletedProduct = yield productModels_1.default.findByIdAndDelete(id);
        if (!deletedProduct) {
            res.status(404).json({ success: false, message: "Product not found" });
            return;
        }
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message || "Server error" });
    }
});
exports.removeProducts = removeProducts;
const singleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.body;
    if (!productId) {
        res.status(400).json({ success: false, message: "Product ID is required" });
        return;
    }
    try {
        const product = yield productModels_1.default.findById(productId);
        if (!product) {
            res.status(404).json({ success: false, message: "Product not found" });
            return;
        }
        res.status(200).json({ success: true, product });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message || "Server error" });
    }
});
exports.singleProduct = singleProduct;
