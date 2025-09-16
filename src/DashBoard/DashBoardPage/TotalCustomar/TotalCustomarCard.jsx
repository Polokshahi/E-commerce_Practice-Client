import React from "react";
import { FaUsers } from "react-icons/fa";
import { Link } from "react-router";

const TotalCustomerCard = () => {
  return (
    <Link
      to="/customerDetails"
      className="bg-white shadow rounded-xl p-6 border-l-4 border-indigo-500 flex items-center justify-between transition-transform duration-200 hover:scale-105 hover:shadow-lg"
    >
      <div>
        <p className="text-3xl font-bold text-gray-800"></p>
        <p className="text-sm text-gray-500">Total Customer</p>
      </div>
      <div className="text-4xl text-indigo-500">
        <FaUsers />
      </div>
    </Link>
  );
};

export default TotalCustomerCard;
