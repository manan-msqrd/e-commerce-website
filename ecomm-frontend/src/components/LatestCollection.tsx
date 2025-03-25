import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import Title from "./Title";
import ProductItem from "./ProductItem";

type Product = {
    _id: string;
    image: string[];
    name: string;
    price: number;
    description?:string;
    category?:string;
    subCategory?:string;
    sizes?:string[];
    date?:number;
    bestSeller?:boolean;
  };
  
const LatestCollection = () => {
    const context = useContext(ShopContext);

    if (!context) {
        return <div>Loading...</div>; // Handle the case where context is null
    }

    const { products } = context;
    const [latestProducts, setLatestProducts] = useState<Product[]>([]);

    useEffect(() => {
        setLatestProducts(products.slice(0, 10));
    }, [products]);
    
  return (
    <div className="my-10">
        <div className="text-center py-8 text-3xl" >
            <Title text1="LATEST" text2="COLLECTIONS"/>
            <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>

        {/* Rendering Products */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
            {latestProducts.length === 0
            ? Array.from({ length: 10 }).map((_, index) => (
                <div
                    key={index}
                    className="h-80 w-full bg-gray-300 animate-pulse rounded"
                />
                ))
            : latestProducts.map((item, index) => (
                <ProductItem
                    key={index}
                    _id={item._id}
                    image={item.image}
                    name={item.name}
                    price={item.price}
                />
                ))}
        </div>
    </div>
  )
}

export default LatestCollection