import express from "express"
import { addProduct, listProducts, removeProducts, singleProduct } from "../controllers/productController";
import upload from "../middleware/multer";
import adminAuth from "../middleware/adminAuth";

const productRouter = express.Router();

productRouter.post('/add', adminAuth, upload.fields([{name: 'image1', maxCount:1}, {name: 'image2', maxCount:1}, {name: 'image3', maxCount:1}, {name: 'image4', maxCount:1}]),addProduct)
productRouter.get('/list',listProducts)
productRouter.post('/remove', adminAuth, removeProducts)
productRouter.post('/single',singleProduct)


export default productRouter