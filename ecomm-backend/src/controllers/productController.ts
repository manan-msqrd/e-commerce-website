import { Request, Response } from "express"
import {v2 as cloudinary} from "cloudinary"
import productModel from "../models/productModels";

export const addProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, description, sizes, bestseller, price, category, subcategory } = req.body;

        // Validate required fields
        if (!name || !description || !sizes || !price || !category) {
            res.status(400).json({ success: false, message: "Missing required fields" });
            return;
        }

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

        res.status(201).json({success: true, message: "Product Added Successfully"})

    } catch (error: any) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message || "Server error" });
    }
}

export const listProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await productModel.find({});

        res.status(200).json({ success: true, products });

    } catch (error: any) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message || "Server error" });
    }
}

export const removeProducts = async (req: Request, res: Response) => {
    const { id } = req.body;

    if (!id) {
        res.status(400).json({ success: false, message: "Product ID is required" });
        return;
    }

    try {
        const deletedProduct = await productModel.findByIdAndDelete(id);

        if (!deletedProduct) {
            res.status(404).json({ success: false, message: "Product not found" });
            return;
        }

        res.status(200).json({ success: true, message: "Product deleted successfully" });

    } catch (error: any) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message || "Server error" });
    }
}

export const singleProduct = async (req: Request, res: Response): Promise<void> => {
        
    const {productId} = req.body;
    if (!productId) {
        res.status(400).json({ success: false, message: "Product ID is required" });
        return;
    }

    try {
        const product = await productModel.findById(productId);

        if (!product) {
            res.status(404).json({ success: false, message: "Product not found" });
            return;
        }

        res.status(200).json({ success: true, product });

    } catch (error: any) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message || "Server error" });
    }
}

