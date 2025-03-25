import { assets } from "../assets/assets"

const OurPolicy = () => {
  return (
    <div className="mt-20 flex flex-col sm:flex-row justify-between gap-12 sm:gap-2 text-center py-2 text-xs sm:text-sm md:text-base text-gray-700">
        <div>
            <img className="w-12 m-auto mb-5" src={assets.exchange_icon} alt="" />
            <p className="font-semibold">Easy Exchange </p>
            <p className="text-gray-400">Hassle free exchanges for upto 30 days</p>
        </div>
        <div>
            <img className="w-12 m-auto mb-5" src={assets.quality_icon} alt="" />
            <p className="font-semibold">7 Days Returns</p>
            <p className="text-gray-400">Hassle free returns for upto 7 days</p>
        </div>
        <div>
            <img className="w-12 m-auto mb-5" src={assets.support_img} alt="" />
            <p className="font-semibold">Quick Customer Support</p>
            <p className="text-gray-400">Hassle free 24/7 support from our team </p>
        </div>
    </div>
  )
}

export default OurPolicy