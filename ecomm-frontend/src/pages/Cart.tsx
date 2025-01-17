import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";


const Cart = () => {

  const context = useContext(ShopContext);

  if(!context){
    return <div>Loading...</div>;
  }

  const {products, cartItems, currency, updateQuantity, navigate} = context;

  const [cartData, setCartData] = useState<{ _id: string; size: string; quantity: any }[]>([]);

  useEffect(() => {

    const tempData = [];

    if(products.length > 0){
      for(const items in cartItems){
        for( const item in cartItems[items]){
          if(cartItems[items][item] > 0){
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            })
          }
        }
        setCartData(tempData)
    }
  }

  }, [cartItems, products])

  return (
    <div className="border-t pt-14">

      <div className="text-2xl mb-3">
        <Title text1={'YOUR'} text2={'CART'}/>
      </div>

      <div className="">
      {cartData.length === 0 ? (
        // Render the "Your cart is empty" message when cartData is empty
        <div className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
          Your cart is empty
        </div>
      ) : (
        // Render the cart items when cartData is not empty
        cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);
          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img
                  className="w-16 sm:w-20"
                  src={productData?.image[0]}
                  alt=""
                />
                <div>
                  <p>{productData?.name}</p>
                  <div className="flex items-center mt-2 gap-5">
                    <p>
                      {currency}
                      {productData?.price}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>
              <input
                onChange={(e) =>
                  e.target.value === '' || e.target.value === '0'
                    ? null
                    : updateQuantity(item._id, item.size, Number(e.target.value))
                }
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                type="number"
                min={1}
                defaultValue={item.quantity}
              />
              <img
                onClick={() => updateQuantity(item._id, item.size, 0)}
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                src={assets.bin_icon}
                alt=""
              />
            </div>
          );
        })
      )}
    </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button onClick={() => (cartData.length > 0) && navigate('/place-order')} className="bg-black text-white py-3 px-8 my-8">PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart