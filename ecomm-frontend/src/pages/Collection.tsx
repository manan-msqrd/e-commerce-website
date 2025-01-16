import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

type Product = {
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
};

const Collection = () => {

    const context = useContext(ShopContext);

    if (!context) {
        return <div>Loading...</div>; // Handle the case where context is null
    }

    const { products, search, showSearch } = context;
    const [showFilter, setShowFilter] = useState<boolean>(false)
    const [filterProducts, setFilterProducts] = useState<Product[]>([])
    const [category, setCategory] = useState<string[]>([])
    const [subcategory, setSubcategory] = useState<string[]>([])
    const [sort, setSort] = useState<string>('')

    const toggleCategory = (e : any) => {
      if (category.includes(e.target.value)) {
        setCategory(category.filter((item) => item !== e.target.value))
      } else {
        setCategory([...category, e.target.value])
      }
    }

    const toggleSubCategory = (e : any) => {
      if (subcategory.includes(e.target.value)) {
        setSubcategory(subcategory.filter((item) => item !== e.target.value))
      } else {
        setSubcategory([...subcategory, e.target.value])
      }
    }

    const applyFilter = () => {

      let productCopy = products.slice();

      if(showSearch && search) {
        productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
      }

      if(category.length > 0) {
        productCopy = productCopy.filter((item) => item.category && category.includes(item.category))
      }

      if(subcategory.length > 0) {
        productCopy = productCopy.filter((item) => item.subcategory && subcategory.includes(item.subcategory))
      }

      setFilterProducts(productCopy);

    }

    const sortProducts = (value : string) => {
      let sortedProducts = [...filterProducts];
      if(value === 'low-high') {
        setFilterProducts(sortedProducts.sort((a, b) => a.price - b.price))
      } else if(value === 'high-low') {
        setFilterProducts(sortedProducts.sort((a, b) => b.price - a.price))
      } else {
        applyFilter();
        return
      }

      setFilterProducts(sortedProducts);
    }

    useEffect(() => {
      applyFilter();
    }, [category, subcategory, showSearch, search, products])

    useEffect(() => {
      sortProducts(sort);
    }, [sort])

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-60">
        <p onClick={() => setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2">FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>
        {/* Categories Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Men'} onChange={toggleCategory}/> Men
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Women'} onChange={toggleCategory}/> Women
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Kids'} onChange={toggleCategory}/> Kids
            </p>
          </div>
        </div>

        {/* Subcategory Filter Options */}
        {/* Categories Filter */}
        <div className={`border border-gray-300 pl-5 my-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Topwear'} onChange={toggleSubCategory}/> Topwear
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory} /> Bottomwear
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Winterwear'} onChange={toggleSubCategory}/> Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          {/* Product Sort */}
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
            <option value="relavent">Sort By: Relavent</option>
            <option value="low-high">Sort By: Low to High</option>
            <option value="high-low">Sort By: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {
            filterProducts.map((product, index) => (
              <ProductItem key={index} name={product.name} price={product.price} image={product.image} _id={product._id} />
            ))
          }

        </div>
      </div>
    </div>
  )
}

export default Collection