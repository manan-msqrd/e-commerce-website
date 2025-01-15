import { Link } from "react-router-dom"
import { assets } from "../assets/assets"

const Footer = () => {
  return (
    <div>
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_3fr] gap-14 my-10 mt-40 text-sm">
            <div>
                <img src={assets.logo} className="mb-5 w-32" alt="" />
                <p className="w-full md:w-2/3 text-gray-600">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis illum quisquam quas voluptatem incidunt.</p>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/collection'}>Collection</Link></li>
                    <li><Link to={'/about'}>About us</Link></li>
                    <li><Link to={'/contact'}>Contact Us</Link></li>
                </ul>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+1-212-456-7890</li>
                    <li>contact@foreveryou.com</li>
                </ul>
            </div>    
        </div>
        <div>
            <hr />
            <p className="my-10 text-sm text-gray-600 text-center">
                Copyright 2025@ forever.com - All Rights Reserved
            </p>
        </div>
    </div>
  )
}

export default Footer