import CartTotal from "../components/CartTotal"
import Title from "../components/Title"


const PlaceOrder = () => {
  return (
    <div className='bg-blue-200 flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>

      {/* Left Side */}
      <div className='bg-pink-100 flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
        </div>
        <div className="flex gap-3">
          <input type="text" className="border border-gray-300 py-1.5 px-3.5 rounded w-full" placeholder="First Name" />
          <input type="text" className="border border-gray-300 py-1.5 px-3.5 rounded w-full" placeholder="Last Name" />
        </div>
        <input type="email" className="border border-gray-300 py-1.5 px-3.5 rounded w-full" placeholder="Email Address" />
        <input type="text" className="border border-gray-300 py-1.5 px-3.5 rounded w-full" placeholder="Street" />

        <div className="flex gap-3">
          <input type="text" className="border border-gray-300 py-1.5 px-3.5 rounded w-full" placeholder="City" />
          <input type="text" className="border border-gray-300 py-1.5 px-3.5 rounded w-full" placeholder="State" />
        </div>

        <div className="flex gap-3">
          <input type="number" className="border border-gray-300 py-1.5 px-3.5 rounded w-full" placeholder="Zipcode" />
          <input type="text" className="border border-gray-300 py-1.5 px-3.5 rounded w-full" placeholder="Country" />
        </div>
        <input className="border border-gray-300 py-1.5 px-3.5 rounded w-full" type="number" placeholder="Phone Number"/>
      </div>

      {/* Right Side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1="PAYMENT" text2="METHOD" />
          <div className="bg-green-200 flex flex-col gap-3 lg:flex-row">
            <div className="flex items-center gap-3 border">
              <p></p>
              <img src="" alt="" />
            </div>
            <div>
              <p></p>
              <img src="" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder