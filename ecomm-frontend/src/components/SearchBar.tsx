import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {

    const context = useContext(ShopContext);

    if (!context) {
        return <div>Loading...</div>; // Handle the case where context is null
    }

    const {search, showSearch, setSearch, setShowSearch} = context;
    const [visible, setVisible] = useState<boolean>(false);
    const location = useLocation();

    useEffect(() => {
        if(location.pathname === '/collection') {
            setVisible(true)
        }
        else {
            setVisible(false)
        }
    }, [location])

  return showSearch && visible ? (
    <div className="border-t border-b text-center bg-gray-50">
        <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
            <input className="flex-1 bg-inherit text-sm outline-none" type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
            <img className="h-4 cursor-pointer" onClick={() => setSearch('')} src={assets.search_icon} alt="" />
        </div>
        <img onClick={()=> setShowSearch(false)} className="inline cursor-pointer w-3" src={assets.cross_icon} alt="" />
    </div>
  ) : null
}

export default SearchBar
