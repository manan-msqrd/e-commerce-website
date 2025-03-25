import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

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

const Product = () => {

  const context = useContext(ShopContext);

    if (!context) {
        return <div>Loading...</div>; // Handle the case where context is null
    }

    const {products, currency, addToCart} = context;

  const {productId} = useParams();
  const [productData, setProductData] = useState<any>(false);
  const [image, setImage] = useState<string>('');
  const [size, setSize] = useState<string>('')

  const fetchProductsData = async () => {
    const data = products.filter((product: Product) => product._id === productId);

    setProductData(data[0]);
    setImage(data[0].image[0]);
    
  }

  useEffect(() => {
    fetchProductsData();
    window.scrollTo(0, 0);
  }, [productId, products])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        
        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item: string, index: number) => (
              <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>
        {/* Product Info */}
        <div className='flex-1'>
            <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
            <div className='flex items-center gap-1 mt-2 '>
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_dull_icon} alt="" className="w-3 5" />
              <p className='pl-2'>(122)</p>
            </div>
            <p className='mt-3 text-3xl font-medium'>{currency}{productData.price}</p>
            <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>

            <div className='flex flex-col gap-4 my-8'>
              <p>Select Size</p>
              <div className='flex gap-2'>
                {productData.sizes.map((item: string, index : number) => (
                  <button onClick={() => setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`} key={index}>{item}</button>
                ))}
              </div>
            </div>
            <button onClick={() => addToCart(productData._id, size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>

            <hr className='mt-8 w-4/5'/>
            <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
              <p>100% Original</p>
              <p>COD Available</p>
              <p>Easy return and exchange within 7 days</p>
            </div>
        </div>
      </div>

      {/* Description & Review Section */}

      <div className='m-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 text-sm text-gray-500 border p-6'>
          <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
          <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
        </div>
      </div>

      {/* Display Related Products */}
      <RelatedProducts category={productData.category} subcategory={productData.subcategory}/>
      
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product