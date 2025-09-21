import { useEffect, useState, useContext } from "react";
import {
  FaHeadphones,
  FaUser,
  FaShoppingCart,
  FaExchangeAlt,
  FaHeart,
  FaBars,
} from "react-icons/fa";
import { Link, NavLink } from "react-router";
import AuthContext from "../../AuthProvider/AuthContext";
import axios from "axios";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext); // Get logged-in user
  const [currentUser, setCurrentUser] = useState({});
  // console.log(user);
  const [isOpen, setIsOpen] = useState(false);
  const [hideTopBar, setHideTopBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => setHideTopBar(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


     useEffect(() =>{

      axios.get(`http://localhost:3000/users/${user?.email}`)
      .then(res =>{
        setCurrentUser(res.data);
      }).catch(err => console.log(err))



     },[user?.email])

     const Role = currentUser?.Role;

     


  
      




























  return (
    <header className="w-full border-b shadow-sm fixed top-0 left-0 z-50 bg-white">
      {/* Top Bar */}
      <div
        className={`bg-green-600 text-white text-xs sm:text-sm flex justify-between items-center px-4 py-2 transition-all duration-300 ${hideTopBar ? "hidden" : "flex"
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

          {/* Show Sign In if not logged in */}
          {!user ? (
            <Link
              to="/login"
              className="flex items-center gap-1 hover:underline cursor-pointer"
            >
              <FaUser /> Sign In
            </Link>
          ) : (
            // Show user dropdown if logged in
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="flex items-center gap-1 hover:underline cursor-pointer"
              >
                <FaUser /> {user.displayName || user.email} ▼
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-white text-black rounded-box w-52 mt-2"
              >
                <li>
                  <Link to="/Userprofile">User Profile</Link>


                </li>
                {Role === "admin" && (
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                )}


               <li>
                 <Link onClick={() => logOut()}>LogOut</Link>
               </li>



              </ul>
            </div>

          )}

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
          className={`flex-col md:flex-row md:flex gap-4 md:gap-6 text-gray-800 font-medium ${isOpen ? "flex" : "hidden md:flex"
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
