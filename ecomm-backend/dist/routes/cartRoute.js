"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cartController_1 = require("../controllers/cartController");
const auth_1 = require("../middleware/auth");
const cartRouter = express_1.default.Router();
cartRouter.get('/get', auth_1.authUser, cartController_1.getUserCart);
cartRouter.post('/add', auth_1.authUser, cartController_1.addToCart);
cartRouter.post('/update', auth_1.authUser, cartController_1.updateCart);
exports.default = cartRouter;
