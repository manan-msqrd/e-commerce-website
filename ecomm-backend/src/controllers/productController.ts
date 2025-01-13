import { Request, Response } from "express"
import {v2 as cloudinary} from "cloudinary"
import productModel from "../models/productModels";

export const addProduct = async (req: Request, res: Response) => {
    try {
        const {name, description, sizes, bestseller, price, category, subcategory} = req.body;

        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        const image1 = files.image1 && files.image1[0];
        const image2 = files.image2 && files.image2[0];
        const image3 = files.image3 && files.image3[0];
        const image4 = files.image4 && files.image4[0];

        const images = [image1, image2, image3, image4].
        filter((image) => image!==undefined);

        let imageUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, {resource_type:'image'})
                return result.secure_url;
            })
        )

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
        }

        const product = new productModel(productData);
        await product.save();

        res.json({success: true, message: "Product Added Successfully"})

    } catch (error:any) {
        res.json({success: false, message: error.message})
    }
}

export const listProducts = async (req: Request, res: Response) => {
    try {
        const products = await productModel.find({});

        res.json({success:true,products})

    } catch (error:any) {
        res.json({success: false, message: error.message})
    }
}

export const removeProducts = async (req: Request, res: Response) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message: "Product deleted successfully"})
    } catch (error:any) {
        res.json({success: false, message: error.message})
    }
}

export const singleProduct = async (req: Request, res: Response) => {
    try {
        const {productId} = req.body;

        const product = await productModel.findById(productId);

        res.json({success:true, product})
    } catch (error:any) {
        res.json({success: false, message: error.message})
    }
}

