import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router";
import useAllProductLength from "../../../Hook/ProductLength/AllProductLenght";
import CountUp from "react-countup";

const TotalProductCard = () => {
  const { length } = useAllProductLength();

  return (
    <Link
      to="/productDetails"
      className="bg-white shadow rounded-xl p-6 border-l-4 border-teal-500 flex items-center justify-between hover:scale-105 transition-transform duration-200"
    >
      <div>
        <p className="text-3xl font-bold text-gray-800">
           <CountUp end={length || 0} duration={2} />
          </p>
        <p className="text-sm text-gray-500">Total Products</p>
      </div>
      <div className="text-4xl text-teal-500">
        <FaShoppingCart />
      </div>
    </Link>
  );
};

export default TotalProductCard;
