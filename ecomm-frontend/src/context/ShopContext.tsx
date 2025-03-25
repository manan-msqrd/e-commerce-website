import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export type Product = {
    _id: string;
    image: string[];
    name: string;
    price: number;
    description?:string;
    category?:string;
    subcategory?:string;
    sizes?:string[];
    date?:number;
    bestSeller?:boolean;
    size?:string;
    quantity?:string | number;
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
    setCartItems: (cartItems: any) => void;
    addToCart: any;
    getCartCount: () => number;
    updateQuantity: (itemId: string, size: string, quantity: number) => Promise<void>;
    getTotalAmount: () => number;
    navigate: any;
    backendUrl: string;
    token: string;
    setToken: (token: string) => void;
};
  

export const ShopContext = createContext<ShopContextType | null>(null);

const ShopContextProvider = (props: any) => {

    const currency = '₹';
    const deliveryFee = 50;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState<string>('')
    const [showSearch , setShowSearch] = useState<boolean>(false)
    const [cartItems, setCartItems] = useState<any>({})
    const [products, setProducts] = useState<Product[]>([])
    const [token, setToken] = useState<string>('')
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
        toast.success('Item added to cart')

        if(token){
            try {
                await axios.post(backendUrl + '/api/cart/add', {itemId, size}, {headers:{token}})
            } catch (error:any) {
                toast.error(error.message)
            }
        }
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
                    console.log(error)
                }
            }
        }
        return totalCount
    }

    const updateQuantity = async (itemId: string, size: string, quantity: number) => {
        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity

        setCartItems(cartData);

        if(token){
            try {
                await axios.post(backendUrl + '/api/cart/update', {itemId, size, quantity}, {headers:{token}})
            } catch (error:any) {
                if(error.response){
                    console.log(error.response.data.message);
                    toast.error(error.response.data.message)
                  }
            }
        }
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
                } catch(error:any) {
                    toast.error(error.message)
                }
            }
        }
        return totalAmount;
    }

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/products/list');
            if(response.data.success){
                setProducts(response.data.products) 
            } else {
                toast.error(response.data.message)
            }
        } catch (error:any) {
            if(error.response){
                console.log(error.response.data.message);
                toast.error(error.response.data.message)
              }
        }
    }

    const getUserCart = async (token:string) => {
        try {
            const response = await axios.get(backendUrl+'/api/cart/get',{headers:{token}});
            if(response.data.success){
                setCartItems(response.data.cartData);
            }
        } catch (error:any) {
          if(error.response){
            console.log(error.response.data.message);
            toast.error(error.response.data.message)
          }
        }
    }

    useEffect(() => {
      getProductsData();
    }, [])

    useEffect(() => {
      if(!token && localStorage.getItem("token")){
        setToken(localStorage.getItem("token") || '')
        getUserCart(localStorage.getItem("token") || '');
      }
    }, [])
    
    

    const value:ShopContextType = {
        products,
        currency,
        deliveryFee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        setCartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getTotalAmount,
        navigate,
        backendUrl,
        token,
        setToken
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider