import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

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

const RelatedProducts = ({category, subcategory } : { category?: string; subcategory?: string }) => {

    const context = useContext(ShopContext)

    if (!context) {
        return <div>Loading...</div>; // Handle the case where context is null
    }

    const {products} = context;
    const [related, setRelated] = useState<Product[]>([])

    useEffect(() => {
        if(products.length>0){
          let productsCopy = [...products];
 
          productsCopy = productsCopy.filter((item) => category === item.category);

          productsCopy = productsCopy.filter((item) => item.subcategory === subcategory);

          console.log("productsCopy2",productsCopy)

          setRelated(productsCopy.slice(0,5));
          
        }
    }, [products])

  return (
    <div className='my-24'>
      <div className='text-center text-3xl py-2'>
        <Title text1='RELATED' text2='PRODUCTS' />
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {related.map((item: Product, index: number) => (
            <ProductItem key={index} _id={item._id} price={item.price} name={item.name} image={item.image} />
        ))
        }
      </div>
    </div>
  )
}

export default RelatedProducts