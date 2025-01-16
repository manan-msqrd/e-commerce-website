import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { toast } from "react-toastify";


const Orders = () => {

  const context = useContext(ShopContext);
    
      if(!context){
        return <div>Loading...</div>;
      }
    
      const {backendUrl, token, currency} = context;
      const [orderData, setOrderData] = useState<any>([]);

      const loadOrderData = async() => {
        try {
          if(!token) return null;

          const response = await axios.get(backendUrl+'/api/order/userorders', {headers:{token}})

          console.log(response.data)

          if(response.data.success){
            let allOrdersData:any = [];
            console.log("response.data.orders", response.data.orders)
            response.data.orders.map((order:any) => {
              order.items.map((item:any) => {
                item['status'] = order.status;
                item['payment'] = order.payment;
                item['paymentMethod'] = order.paymentMethod;
                item['date'] = order.date;
                allOrdersData.push(item);
              })
            })
            setOrderData(allOrdersData.reverse())
          }

        } catch (error:any) {
          if(error.response){
            console.log(error.response.data.message);
            toast.error(error.response.data.message)
          }
        }
      }

      useEffect(() => {
        loadOrderData();
      }, [token])
      


  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1="MY" text2="ORDERS"/>
      </div>

      <div>
        {
          orderData.map((item: any, index: any) => (
            <div key={index} className="pt-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-start text-sm gap-6">
                <img className="w-16 sm:w-20" src={item.image[0]} alt="" />
                <div>
                  <p className="sm:text-base font-medium">{item.name}</p>
                  <div className="flex items-center text-sm gap-3 mt-2 text-gray-700">
                    <p  >{currency}{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className="mt-1">Date: <span className="text-gray-400">{new Date(item.date).toString()}</span></p>
                  <p className="mt-1">Payment Method: <span className="text-gray-400">{item.paymentMethod}</span></p>

                </div>
              </div>
              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green-600"></p>
                  <p className="text-sm md:text-base">{item.status}</p>
                </div>
                <button onClick={loadOrderData} className="border px-4 py-2 text-sm font-medium rounded-sm">Track Order</button>
              </div>
            </div>
          ))
        }
      </div>
      
    </div>
  )
}

export default Orders