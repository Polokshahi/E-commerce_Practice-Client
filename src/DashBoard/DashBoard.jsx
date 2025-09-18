import TotalCustomerCard from "./DashBoardPage/TotalCustomar/TotalCustomarCard";
import TotalProductCard from "./DashBoardPage/TotalProduct/TotalProductaCard";
import TotalSupplierCard from "./DashBoardPage/TotalSupplier/TotalSupplierCard";
import TotalInvoiceCard from "./DashBoardPage/TotalInvoice/TotalInvoiceCard";
import {
  FaCashRegister,
  FaFileInvoice,
  FaBoxOpen,
  FaUserPlus,
  FaChartLine,
  FaClipboardList,
  FaShoppingCart,
  FaChartBar,
} from "react-icons/fa";
import { Link } from "react-router";

const Dashboard = () => {
  return (
    <div className="p-2 sm:p-4 md:p-6">
      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        <TotalCustomerCard />
        <TotalProductCard />
        <TotalSupplierCard />
        <TotalInvoiceCard />
      </div>

      {/* Action Cards */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Create POS Invoice */}
        <div className="w-full rounded-lg text-black p-6 flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg hover:scale-105 transition-transform duration-200 cursor-pointer">
          <div className="mb-4 bg-white/20 p-4 rounded-full">
            <FaCashRegister className="text-white" size={32} />
          </div>
          <div className="text-center font-semibold text-base sm:text-lg">
            Create POS Invoice
          </div>
        </div>

        {/* Create New Invoice */}
        <div className="w-full rounded-lg text-black p-6 flex flex-col items-center justify-center bg-gradient-to-r from-orange-500 to-yellow-500 shadow-lg hover:scale-105 transition-transform duration-200 cursor-pointer">
          <div className="mb-4 bg-white/20 p-4 rounded-full">
            <FaFileInvoice className="text-white" size={32} />
          </div>
          <div className="text-center font-semibold text-base sm:text-lg">
            Create New Invoice
          </div>
        </div>

        {/* Add Product */}
        <div className="w-full rounded-lg text-black p-6 flex flex-col items-center justify-center bg-gradient-to-r from-green-400 to-green-600 shadow-lg hover:scale-105 transition-transform duration-200 cursor-pointer">
          <div className="mb-4 bg-white/20 p-4 rounded-full">
            <FaBoxOpen className="text-white" size={32} />
          </div>
          <div className="text-center font-semibold text-base sm:text-lg">
            <Link className="hover:text-white" to={"/addproduct"}>
              Add Product
            </Link>
          </div>
        </div>

        {/* Add Customer */}
        <div className="w-full rounded-lg text-black p-6 flex flex-col items-center justify-center bg-gradient-to-r from-pink-500 to-red-500 shadow-lg hover:scale-105 transition-transform duration-200 cursor-pointer">
          <div className="mb-4 bg-white/20 p-4 rounded-full">
            <FaUserPlus className="text-white" size={32} />
          </div>
          <div className="text-center font-semibold text-base sm:text-lg">
            Add Customer
          </div>
        </div>

        {/* Sales Report */}
        <div className="w-full rounded-lg text-black p-6 flex flex-col items-center justify-center bg-gradient-to-r from-teal-400 to-blue-500 shadow-lg hover:scale-105 transition-transform duration-200 cursor-pointer">
          <div className="mb-4 bg-white/20 p-4 rounded-full">
            <FaChartLine className="text-white" size={32} />
          </div>
          <div className="text-center font-semibold text-base sm:text-lg">
            Sales Report
          </div>
        </div>

        {/* Purchase Report */}
        <div className="w-full rounded-lg text-black p-6 flex flex-col items-center justify-center bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg hover:scale-105 transition-transform duration-200 cursor-pointer">
          <div className="mb-4 bg-white/20 p-4 rounded-full">
            <FaClipboardList className="text-white" size={32} />
          </div>
          <div className="text-center font-semibold text-base sm:text-lg">
            Purchase Report
          </div>
        </div>

        {/* Stock Report */}
        <div className="w-full rounded-lg text-black p-6 flex flex-col items-center justify-center bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg hover:scale-105 transition-transform duration-200 cursor-pointer">
          <div className="mb-4 bg-white/20 p-4 rounded-full">
            <FaShoppingCart className="text-white" size={32} />
          </div>
          <div className="text-center font-semibold text-base sm:text-lg">
            Stock Report
          </div>
        </div>

        {/* Account Summary */}
        <div className="w-full rounded-lg text-black p-6 flex flex-col items-center justify-center bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg hover:scale-105 transition-transform duration-200 cursor-pointer">
          <div className="mb-4 bg-white/20 p-4 rounded-full">
            <FaChartBar className="text-white" size={32} />
          </div>
          <div className="text-center font-semibold text-base sm:text-lg">
            Account Summary
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
