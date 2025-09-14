import { useEffect, useRef, useState } from "react";
import {
  FaHeadphones,
  FaUser,
  FaShoppingCart,
  FaExchangeAlt,
  FaHeart,
  FaBars,
} from "react-icons/fa";
import { Link, NavLink } from "react-router";
import Login from "../Login/Login";
import Register from "../Register/Register";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hideTopBar, setHideTopBar] = useState(false);
  const [activeTab, setActiveTab] = useState("login"); // ✅ tab state
  const modalRef = useRef(null);

  const openModal = (e) => {
    e.preventDefault();
    modalRef.current.showModal();
    document.body.style.overflow = "hidden"; // lock background scroll
  };

  const closeModal = () => {
    modalRef.current.close();
    document.body.style.overflow = "auto"; // unlock scroll
  };

  useEffect(() => {
    const handleScroll = () => setHideTopBar(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="w-full border-b shadow-sm fixed top-0 left-0 z-50 bg-white">
      {/* Top Bar */}
      <div
        className={`bg-green-600 text-white text-xs sm:text-sm flex justify-between items-center px-4 py-2 transition-all duration-300 ${
          hideTopBar ? "hidden" : "flex"
        }`}
      >
        {/* Left section */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex lg:flex">
            <FaHeadphones />
          </div>
          <span className="hidden sm:inline">
            Have a question? CALL US +1-888-12497
          </span>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4 ml-auto sm:ml-0">
          <Link className="flex items-center gap-1 hover:underline">
            <FaUser /> Track My Order
          </Link>
          <Link
            onClick={openModal}
            className="flex items-center gap-1 hover:underline cursor-pointer"
          >
            <FaUser /> Sign In
          </Link>
          <select className="bg-green-600 text-white outline-none">
            <option>English / USD</option>
            <option>Bangla / BDT</option>
          </select>
        </div>
      </div>

      {/* Middle Section */}
      <div className="flex flex-col md:flex-row justify-between items-center px-4 py-3 gap-4 md:gap-10 text-center">
        {/* Logo */}
        <div className="flex flex-col items-center gap-1 text-2xl font-bold text-green-700">
          <div className="flex items-center gap-2">
            <FaShoppingCart className="text-black" />
            <Link to={"/"}>ISSHUE</Link>
          </div>
          <p className="text-xs text-gray-500">Multi Store eCommerce Solution</p>
        </div>

        {/* Search */}
        <div className="flex w-full md:w-1/3">
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
        <div className="flex items-center gap-4 md:gap-6 text-gray-600">
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
          className={`flex-col md:flex-row md:flex gap-4 md:gap-6 text-gray-800 font-medium ${
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

      {/* Modal */}
      <dialog
        ref={modalRef}
        className="modal fixed inset-0 z-50 flex items-center justify-center  p-4"
      >
        <div className="modal-box w-full max-w-md sm:max-w-lg md:max-w-xl max-h-[90vh] overflow-hidden relative bg-white rounded-lg shadow-lg p-4">
          {/* Close Button */}
          <button
            type="button"
            onClick={closeModal}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black"
          >
            ✕
          </button>

          {/* ✅ Tabs with div instead of react-tabs */}
          <div className="flex justify-around border-b mb-4">
            <div
              onClick={() => setActiveTab("login")}
              className={`cursor-pointer py-2 px-4 ${
                activeTab === "login"
                  ? "border-b-2 border-green-600 font-semibold"
                  : "text-gray-500"
              }`}
            >
              Login
            </div>
            <div
              onClick={() => setActiveTab("signup")}
              className={`cursor-pointer py-2 px-4 ${
                activeTab === "signup"
                  ? "border-b-2 border-green-600 font-semibold"
                  : "text-gray-500"
              }`}
            >
              Sign Up
            </div>
          </div>

          {/* Tab Panels */}
          <div className="flex-1">
            {activeTab === "login" && <Login />}
            {activeTab === "signup" && <Register />}
          </div>
        </div>
      </dialog>
    </header>
  );
};

export default Navbar;
