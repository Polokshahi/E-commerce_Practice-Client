import { useState } from "react";
import {
  FaHeadphones,
  FaUser,
  FaShoppingCart,
  FaExchangeAlt,
  FaHeart,
  FaBars,
} from "react-icons/fa";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full border-b shadow-sm">
      {/* Top bar */}
      <div className="bg-green-600 text-white text-sm flex justify-between items-center px-4 py-2">
        <div className="flex items-center gap-2">
          <FaHeadphones />
          <span>Have a question? CALL US +00-000-00000</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="#" className="flex items-center gap-1 hover:underline">
            <FaUser /> Track My Order
          </Link>
          <Link href="#" className="flex items-center gap-1 hover:underline">
            <FaUser /> Sign In
          </Link>
          <select className="bg-green-600 text-white outline-none">
            <option>English / USD</option>
            <option>Bangla / BDT</option>
          </select>
        </div>
      </div>

      {/* Middle Section */}
      <div className="flex flex-col md:flex-row justify-between items-center px-4 py-3 gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 text-2xl font-bold text-green-700">
          <FaShoppingCart className="text-black" />
          <span>ISSHUE</span>
          <p className="text-xs text-gray-500 ml-2">
            Multi Store eCommerce Solution
          </p>
        </div>

        {/* Search */}
        <div className="flex w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search for products"
            className="w-full border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none"
          />
          <button className="bg-green-600 text-white px-5 rounded-r-md">
            Search
          </button>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-6 text-gray-600">
          <div className="relative flex flex-col items-center">
            <FaExchangeAlt size={20} />
            <span className="text-xs">Compare</span>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              0
            </span>
          </div>
          <div className="relative flex flex-col items-center">
            <FaHeart size={20} />
            <span className="text-xs">Wishlist</span>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              0
            </span>
          </div>
          <div className="relative flex flex-col items-center">
            <FaShoppingCart size={20} />
            <span className="text-xs">My Cart</span>
            <span className="text-xs">$0.00</span>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              0
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Navbar */}
      <nav className="bg-white px-4 py-2 border-t">
        <div className="flex justify-between items-center md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <FaBars size={20} />
          </button>
        </div>
        <ul
          className={`flex-col md:flex-row md:flex gap-6 text-gray-800 font-medium ${
            isOpen ? "flex" : "hidden md:flex"
          }`}
        >
          <NavLink className="cursor-pointer">All Categories</NavLink>
          <NavLink className="cursor-pointer">Home</NavLink>
          <NavLink className="cursor-pointer">Women's Fashion</NavLink>
          <NavLink className="cursor-pointer">Men's Fashion</NavLink>
          <NavLink className="cursor-pointer">Electronics</NavLink>
          <NavLink className="cursor-pointer">Home & Beauty</NavLink>
          <NavLink className="cursor-pointer">Home and Garden</NavLink>
          <NavLink className="cursor-pointer">Computer</NavLink>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
