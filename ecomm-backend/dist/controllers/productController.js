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
        res.json({ success: true, message: "Product Added Successfully" });
    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
});
exports.addProduct = addProduct;
const listProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productModels_1.default.find({});
        res.json({ success: true, products });
    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
});
exports.listProducts = listProducts;
const removeProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield productModels_1.default.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Product deleted successfully" });
    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
});
exports.removeProducts = removeProducts;
const singleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.body;
        const product = yield productModels_1.default.findById(productId);
        res.json({ success: true, product });
    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
});
exports.singleProduct = singleProduct;
