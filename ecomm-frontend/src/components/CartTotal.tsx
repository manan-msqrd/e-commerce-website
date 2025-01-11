import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";


const CartTotal = () => {

    const context = useContext(ShopContext);
    
      if(!context){
        return <div>Loading...</div>;
      }
    
      const {currency, deliveryFee, getTotalAmount} = context;
    
  return (
    <div className="w-full">
        <div className="text-2xl">
            <Title text1={'CART'} text2={'TOTAL'}/>
        </div>

        <div className="flex flex-col gap-2 mt-2 text-sm">
            <div className="flex justify-between">
                <p>Subtotal</p>
                <p>{currency}{getTotalAmount()}.00</p>
            </div>
            <hr />
            <div className="flex justify-between">
                <p>Shipping Fee</p>
                <p>{currency}{deliveryFee}.00</p>
            </div>
            <hr />
            <div className="flex justify-between">
                <p>Total</p>
                <p>{currency}{getTotalAmount()===0 ? 0 : getTotalAmount() + deliveryFee}.00</p>
            </div>
        </div>

        

    </div>
  )
}

export default CartTotal