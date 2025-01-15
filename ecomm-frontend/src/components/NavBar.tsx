import logo from "../assets/logo.png"
import searchIcon from "../assets/search_icon.png"
import profileIcon from "../assets/profile_icon.png"
import cartIcon from "../assets/cart_icon.png"
import menuIcon from "../assets/menu_icon.png"
import dropdownIcon from "../assets/dropdown_icon.png"
 
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useContext, useState } from "react"
import { ShopContext } from "../context/ShopContext"

const NavBar = () => {
    const [visible, setVisible] = useState(false)
    const location = useLocation();

    const context = useContext(ShopContext);

    if (!context) {
        return <div>Loading...</div>;
    }

    const {setShowSearch, getCartCount, setCartItems, navigate, token, setToken} = context;

    const logout = () => {
      navigate('/login')
      localStorage.removeItem('token');
      setToken('');
      setCartItems({});
    }

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <Link to={'/'}>
      <img src={logo} className='w-36'/>
      </Link>
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `flex flex-col items-center gap-1 ${isActive ? 'active' : ''}`
          }
        >
          <p>HOME</p>
          <hr className='w-2/4 h-[1.5px] border-none bg-gray-700 opacity-0 transition-opacity duration-200 active:opacity-100' />
        </NavLink>
        <NavLink 
          to="/collection" 
          className={({ isActive }) => 
            `flex flex-col items-center gap-1 ${isActive ? 'active' : ''}`
          }
        >
          <p>COLLECTION</p>
          <hr className='w-2/4 h-[1.5px] border-none bg-gray-700 opacity-0 transition-opacity duration-200 active:opacity-100' />
        </NavLink>
        <NavLink 
          to="/about" 
          className={({ isActive }) => 
            `flex flex-col items-center gap-1 ${isActive ? 'active' : ''}`
          }
        >
          <p>ABOUT</p>
          <hr className='w-2/4 h-[1.5px] border-none bg-gray-700 opacity-0 transition-opacity duration-200 active:opacity-100' />
        </NavLink>
        <NavLink 
          to="/contact" 
          className={({ isActive }) => 
            `flex flex-col items-center gap-1 ${isActive ? 'active' : ''}`
          }
        >
          <p>CONTACT</p>
          <hr className='w-2/4 h-[1.5px] border-none bg-gray-700 opacity-0 transition-opacity duration-200 active:opacity-100' />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
          {location.pathname === '/collection' && 
          <img onClick={() => setShowSearch(true)} src={searchIcon} className="w-5 cursor-pointer"/>}

          <div className="group relative">
            <img onClick={() => token ? null : navigate('/login')} src={profileIcon} className="w-5 cursor-pointer"/>
            {/* Dropdown Menu */}
            {token && 
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-600 rounded-md">
                    {/* <p className="cursor-pointer hover:text-black">My Profile</p> */}
                    <p onClick={() => navigate('/orders')} className="cursor-pointer hover:text-black">My Orders</p>
                    <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p>
                </div>
            </div>}
          </div>
          <Link to='/cart' className="relative">
            <img src={cartIcon} className='w-5 min-w-5' alt="" />
                <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">{getCartCount()}</p>
          </Link>
          <img onClick={() => setVisible(true)} src={menuIcon} className='w-5 cursor-pointer sm:hidden' alt="" />
      </div>

      {/* Sidebar for small screens */}
      <div className= {`bg-white absolute top-0 right-0 bottom-0 overflow-hidden transition-all ${visible ? "w-full" : "w-0"}`}>
          <div className="flex flex-col text-gray-600 cursor-pointer">
            <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3">
                <img className="h-4 rotate-180" src={dropdownIcon} alt="" />
                <p>Back</p>
            </div>
            <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/">HOME</NavLink>
            <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/collection">COLLECTION</NavLink>
            <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/about">ABOUT</NavLink>
            <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/contact">CONTACT</NavLink>

          </div>
      </div>
    </div>
  )
}

export default NavBar