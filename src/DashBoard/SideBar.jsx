import { useContext, useState } from "react";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import {
  FaTachometerAlt,
  FaCashRegister,
  FaUsers,
  FaBox,
  FaExchangeAlt,
  FaShoppingCart,
  FaChevronDown,
  FaChevronUp,
  
} from "react-icons/fa";
import { Link } from "react-router";
import AuthContext from "../AuthProvider/AuthContext";

const SideBar = () => {
  const { user } = useContext(AuthContext);
  const [salesOpen, setSalesOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false); // separate state
  const [customerOpen, setCustomerOpen] = useState(false);

  return (
    <div className="bg-black text-white w-40 md:w-54 lg:w-64  min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-gray-800 flex items-center justify-center gap-2">
        <FaShoppingCart className="text-green-500 text-2xl" />
        <span className="text-green-500 text-2xl font-bold">ISSHUE</span>
      </div>

      {/* User */}
      <div className="flex flex-col items-center py-6">
        <div className="w-16 h-16 bg-white rounded-full border-4 border-green-500 flex items-center justify-center">
          <span className="text-2xl">👦</span>
        </div>
        <p className="mt-2 font-semibold text-green-500">{user?.displayName}</p>
        <span className="w-2 h-2 bg-green-500 rounded-full mt-1" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {/* Dashboard */}
        <Link
          to={"/dashboard"}
          className="flex items-center gap-3 hover:bg-[#44c003] p-2 rounded"
        >
          <FaTachometerAlt /> Dashboard
        </Link>

        {/* Sales dropdown */}
        <button
          onClick={() => setSalesOpen(!salesOpen)}
          className="flex items-center justify-between w-full hover:bg-[#44c003] p-2 rounded"
        >
          <span className="flex items-center gap-3">
            <FaCashRegister /> Sales
          </span>
          {salesOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${salesOpen ? "max-h-40" : "max-h-0"
            }`}
        >
          <div className="ml-8 flex flex-col space-y-1">
            <Link
              to={"/sales"}
              className="flex items-center gap-2 hover:text-green-500 p-2 rounded text-sm"
            >
              New Sale
            </Link>
            <Link
              to={"/possale"}
              className="flex items-center gap-2 hover:text-green-500 p-2 rounded text-sm"
            >
              Manage Sale
            </Link>
          </div>
        </div>

        {/* Product dropdown */}
        <button
          onClick={() => setProductOpen(!productOpen)}
          className="flex items-center justify-between w-full hover:bg-[#44c003] p-2 rounded"
        >
          <span className="flex items-center gap-3">
            <MdOutlineProductionQuantityLimits />
            Product
          </span>
          {productOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${productOpen ? "max-h-40" : "max-h-0"
            }`}
        >
          <div className="ml-8 flex flex-col space-y-1">
            <Link
              to={"/addproduct"}
              className="flex items-center gap-2 hover:text-green-500 p-2 rounded text-sm"
            >
              Add Product
            </Link>
          </div>
        </div>

        {/* Customer dropdown */}
        <button
          onClick={() => setCustomerOpen(!customerOpen)}
          className="flex items-center justify-between w-full hover:bg-[#44c003] p-2 rounded"
        >
          <span className="flex items-center gap-3">
            <FaUsers /> Customer
          </span>
          {customerOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${customerOpen ? "max-h-40" : "max-h-0"
            }`}
        >
          <div className="ml-8 flex flex-col space-y-1">
            <Link
              to={"/customer/add"}
              className="flex items-center gap-2 hover:text-green-500 p-2 rounded text-sm"
            >
              Add Customer
            </Link>
            <Link
              to={"/customer/create"}
              className="flex items-center gap-2 hover:text-green-500 p-2 rounded text-sm"
            >
              Create Customer
            </Link>
          </div>
        </div>

        {/* Stock */}
        <Link
          to={"/stock"}
          className="flex items-center gap-3 hover:bg-[#44c003] p-2 rounded"
        >
          <FaBox /> Stock
        </Link>

        {/* Transfer */}
        <Link
          to={"/transfer"}
          className="flex items-center gap-3 hover:bg-[#44c003] p-2 rounded"
        >
          <FaExchangeAlt /> Transfer
        </Link>
      </nav>

      {/* Footer */}
      <div className="p-4 text-center text-xs text-gray-400 mt-auto">
        © 2025 <strong>Developed by Polok Shahi</strong>
      </div>
    </div>
  );
};

export default SideBar;
