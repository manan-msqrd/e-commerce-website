import { assets } from "../assets/assets"
import NewsletterBox from "../components/NewsletterBox"
import Title from "../components/Title"


const Contact = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1="CONTACT" text2="US" />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-10 mb-28">
        <img className="w-full md:max-w-[450px]" src={assets.contact_img} alt="" />
        <div className="flex flex-col justify-center gap-6">
          <p className="font-semibold text-xl text-gray-800">Our Store</p>
          <p className="text-gray-500">54709 Willms Station <br/> Suite 350, Washington, USA</p>
          <p className="text-gray-500">Tel: (415) 555-0XXX<br/> Email: admin@forever.com</p>
          <p className="font-semibold text-xl text-gray-600">Careers at Forever</p>
          <p className="text-gray-500">Learn more about our job openings</p>
          <button className="border border-black text-sm px-8 py-4 hover:bg-black hover:text-white transition-all duration-500">Explore Jobs</button>
        </div>
      </div>
      <NewsletterBox />
    </div>
  )
}

export default Contact