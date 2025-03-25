import { useContext } from "react"
import { ShopContext } from "../context/ShopContext"
import { Link } from "react-router-dom";

type ProductItemProps = {
    _id: string;
    image: string[];
    name: string;
    price: number;
  };

const ProductItem = ({_id, image, name, price} : ProductItemProps) => {

    const context = useContext(ShopContext);

    if (!context) {
        return null;
    }

    const { currency } = context;

  return (
    <div>
        <Link className="text-gray-700 cursor-pointer" to={`/product/${_id}`}>
            <div className="overflow-hidden">
                <img className="hover:scale-110 transition ease-in-out" src={image[0]} alt="" />
            </div>
            <p className="pt-3 pb-1 text-sm">{name}</p>
            <p className="text-sm font-medium">{currency}{price}</p>
        </Link>
        
    </div>
  )
}

export default ProductItem