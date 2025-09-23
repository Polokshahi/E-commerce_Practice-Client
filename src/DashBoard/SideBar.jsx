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
  const [productOpen, setProductOpen] = useState(false);
  const [customerOpen, setCustomerOpen] = useState(false);

  return (
    <div className="bg-black text-white w-40 sm:w-44 md:w-56 lg:w-64 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-3 sm:p-4 border-b border-gray-800 flex items-center justify-center gap-2">
        <FaShoppingCart className="text-green-500 text-xl sm:text-2xl" />
        <span className="text-green-500 text-lg sm:text-2xl font-bold">ISSHUE</span>
      </div>

      {/* User */}
      <div className="flex flex-col items-center py-4 sm:py-6">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full border-4 border-green-500 flex items-center justify-center">
          <span className="text-xl sm:text-2xl">👦</span>
        </div>
        <p className="mt-1 sm:mt-2 font-semibold text-green-500 text-center text-sm sm:text-base break-words">
          {user?.displayName}
        </p>
        <span className="w-2 h-2 bg-green-500 rounded-full mt-1" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 sm:px-4 space-y-1 sm:space-y-2">
        {/* Dashboard */}
        <Link
          to={"/dashboard"}
          className="flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 rounded hover:bg-green-600 transition-colors duration-200 text-sm sm:text-base"
        >
          <FaTachometerAlt /> Dashboard
        </Link>

        {/* Sales dropdown */}
        <button
          onClick={() => setSalesOpen(!salesOpen)}
          className="flex items-center justify-between w-full p-2 sm:p-2.5 rounded hover:bg-green-600 transition-colors duration-200 text-sm sm:text-base"
        >
          <span className="flex items-center gap-2 sm:gap-3">
            <FaCashRegister /> Sales
          </span>
          {salesOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
        </button>
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${salesOpen ? "max-h-40" : "max-h-0"}`}>
          <div className="ml-6 sm:ml-8 flex flex-col space-y-1">
            <Link to={"/sales"} className="flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded hover:text-green-500 text-sm sm:text-sm">
              New Sale
            </Link>
            <Link to={"/possale"} className="flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded hover:text-green-500 text-sm sm:text-sm">
              Manage Sale
            </Link>
          </div>
        </div>

        {/* Product dropdown */}
        <button
          onClick={() => setProductOpen(!productOpen)}
          className="flex items-center justify-between w-full p-2 sm:p-2.5 rounded hover:bg-green-600 transition-colors duration-200 text-sm sm:text-base"
        >
          <span className="flex items-center gap-2 sm:gap-3">
            <MdOutlineProductionQuantityLimits /> Product
          </span>
          {productOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
        </button>
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${productOpen ? "max-h-40" : "max-h-0"}`}>
          <div className="ml-6 sm:ml-8 flex flex-col space-y-1">
            <Link to={"/addproduct"} className="flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded hover:text-green-500 text-sm sm:text-sm">
              Add Product
            </Link>
          </div>
        </div>

        {/* Customer dropdown */}
        <button
          onClick={() => setCustomerOpen(!customerOpen)}
          className="flex items-center justify-between w-full p-2 sm:p-2.5 rounded hover:bg-green-600 transition-colors duration-200 text-sm sm:text-base"
        >
          <span className="flex items-center gap-2 sm:gap-3">
            <FaUsers /> Customer
          </span>
          {customerOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
        </button>
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${customerOpen ? "max-h-40" : "max-h-0"}`}>
          <div className="ml-6 sm:ml-8 flex flex-col space-y-1">
            <Link to={"/customer/add"} className="flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded hover:text-green-500 text-sm sm:text-sm">
              Add Customer
            </Link>
            <Link to={"/customer/create"} className="flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded hover:text-green-500 text-sm sm:text-sm">
              Create Customer
            </Link>
          </div>
        </div>

        {/* Stock */}
        <Link
          to={"/stock"}
          className="flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 rounded hover:bg-green-600 transition-colors duration-200 text-sm sm:text-base"
        >
          <FaBox /> Stock
        </Link>

        {/* Transfer */}
        <Link
          to={"/transfer"}
          className="flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 rounded hover:bg-green-600 transition-colors duration-200 text-sm sm:text-base"
        >
          <FaExchangeAlt /> Transfer
        </Link>
      </nav>

      {/* Footer */}
      <div className="p-3 sm:p-4 text-center text-xs sm:text-sm text-gray-400 mt-auto">
        © 2025 <strong>Developed by Polok Shahi</strong>
      </div>
    </div>
  );
};

export default SideBar;
