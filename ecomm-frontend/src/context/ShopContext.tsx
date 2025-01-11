import { createContext, useState } from "react";
import {products} from "../assets/assets"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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

type ShopContextType = {
    products: Product[];
    currency: string;
    deliveryFee: number;
    search: string;
    setSearch: (search: string) => void;
    showSearch: boolean;
    setShowSearch: (showSearch: boolean) => void;
    cartItems: any;
    addToCart: any;
    getCartCount: () => number;
    updateQuantity: (itemId: string, size: string, quantity: number) => Promise<void>;
    getTotalAmount: () => number;
    navigate: any;
};
  

export const ShopContext = createContext<ShopContextType | null>(null);

const ShopContextProvider = (props: any) => {

    const currency = '₹';
    const deliveryFee = 50;
    const [search, setSearch] = useState<string>('')
    const [showSearch , setShowSearch] = useState<boolean>(false)
    const [cartItems, setCartItems] = useState<any>({})
    const navigate = useNavigate();

    const addToCart = async (itemId : string, size: string) => {
        let cartData = structuredClone(cartItems)

        if(!size){
            toast.error('Select Product Size');
            return;
        }

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        setCartItems(cartData)
    }

    const getCartCount = () => {
        let totalCount = 0;
        for(const items in cartItems){
            for( const item in cartItems[items]){
                try {
                    if(cartItems[items][item]){
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }
        return totalCount
    }

    const updateQuantity = async (itemId: string, size: string, quantity: number) => {
        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity

        setCartItems(cartData);
    }

    const getTotalAmount = () => {
        let totalAmount = 0;

        for(const items in cartItems){
            let itemInfo = products.find((product) => product._id === items);
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item] > 0){
                        totalAmount += cartItems[items][item] * (itemInfo?.price ?? 0);
                    }
                } catch(error) {

                }
            }
        }
        return totalAmount;
    }


    const value:ShopContextType = {
        products,
        currency,
        deliveryFee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getTotalAmount,
        navigate
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider