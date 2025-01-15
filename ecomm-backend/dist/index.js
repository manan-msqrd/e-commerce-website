"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const mongodb_1 = __importDefault(require("./config/mongodb"));
const cloudinary_1 = __importDefault(require("./config/cloudinary"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const productRoute_1 = __importDefault(require("./routes/productRoute"));
const cartRoute_1 = __importDefault(require("./routes/cartRoute"));
const orderRoute_1 = __importDefault(require("./routes/orderRoute"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
(0, mongodb_1.default)();
(0, cloudinary_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//api endpoints
app.use('/api/user', userRoute_1.default);
app.use('/api/products', productRoute_1.default);
app.use('/api/cart', cartRoute_1.default);
app.use('/api/order', orderRoute_1.default);
app.get('/', (req, res) => {
    res.send('Hello, TypeScript!');
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
