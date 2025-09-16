import { FaUniversity, FaCog } from "react-icons/fa"; // import icons
import { Link } from "react-router";

const Header = () => {
    return (
        <div className="flex  justify-between items-center px-4 py-2  border-b bg-white">
            {/* Left Section */}
            <div>
                <h1 className="text-xl font-semibold">Dashboard</h1>
                <div className=" text-gray-500 flex justify-center gap-2 items-center">
                    <Link to={'/'}>Home</Link> |
                    <Link to={'/dashboard'}>Dashboard</Link>


                </div>




            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
                {/* Notification / Logo button */}
                <button className="relative cursor-pointer text-xl text-gray-700 hover:text-green-600">
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    <FaUniversity />
                </button>

                {/* Settings */}
                <button className="text-xl text-gray-700 hover:text-green-600">
                    <FaCog />
                </button>
            </div>
        </div>
    );
};

export default Header;
