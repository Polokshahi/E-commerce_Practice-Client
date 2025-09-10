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
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Login from "../Login/login";
import Register from "../Register/Register";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hideTopBar, setHideTopBar] = useState(false);
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
    const handleScroll = () => {
      setHideTopBar(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="w-full border-b shadow-sm fixed top-0 left-0 z-50 bg-white">
      {/* Top bar */}
      <div
        className={`bg-green-600 text-white text-sm flex justify-between items-center px-4 py-2 transition-all duration-300 ${
          hideTopBar ? "hidden" : "flex"
        }`}
      >
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <FaHeadphones />
          <span>Have a question? CALL US +1-888-12497</span>
        </div>
        <div className="flex items-center gap-4 text-xs sm:text-sm">
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
          <p className="text-xs text-gray-500">
            Multi Store eCommerce Solution
          </p>
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
        className="modal fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div className="modal-box max-w-xl w-full h-[550px] md:h-[550px] overflow-y-auto relative bg-white rounded-lg shadow-lg mx-4 md:mx-0">
          <button
            type="button"
            onClick={closeModal}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black"
          >
            ✕
          </button>

          <Tabs className="h-full flex flex-col">
            <TabList className="flex justify-around border-b mb-4">
              <Tab className="cursor-pointer py-2 px-4">Login</Tab>
              <Tab className="cursor-pointer py-2 px-4">SignUp</Tab>
            </TabList>

            <div className="flex-1 overflow-y-auto">
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Register />
              </TabPanel>
            </div>
          </Tabs>
        </div>
      </dialog>
    </header>
  );
};

export default Navbar;



import { Link } from "react-router";

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-md p-6 sm:p-8 space-y-6 bg-white rounded-lg shadow-lg">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold text-black text-center">
          Login
        </h2>

        {/* Form */}
        <form className="space-y-4">
          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
          />

          {/* Remember Me & Forgot Password */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm">
            <label className="flex items-center space-x-2 mb-2 sm:mb-0">
              <input type="checkbox" className="form-checkbox text-green-600" />
              <span className="text-gray-700">Remember Me</span>
            </label>
            <a href="#" className="text-blue-600 hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-md shadow transition-colors duration-200"
          >
            Login
          </button>
        </form>

        {/* Sign Up Redirect */}
        <div className="text-center text-sm text-gray-700">
          Don't have an account?{" "}
          <Link className="text-green-700 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;


import React from "react";

const Register = () => {
  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-white px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-md p-6 sm:p-8 space-y-6 bg-white rounded-lg shadow-lg">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold text-black text-center">
          Sign Up
        </h2>

        {/* Form */}
        <form className="space-y-4">
          {/* First Name */}
          <input
            type="text"
            placeholder="First Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600 text-black"
          />

          {/* Last Name */}
          <input
            type="text"
            placeholder="Last Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600 text-black"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600 text-black"
          />

          {/* Date of Birth */}
          <input
            type="date"
            className="w-full px-4 py-3 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600 text-black"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600 text-black"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-md shadow transition-colors duration-200"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
