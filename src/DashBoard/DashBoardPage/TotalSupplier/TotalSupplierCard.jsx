import React from "react";
import { FaUserTie } from "react-icons/fa";
import { Link } from "react-router";

const TotalSupplierCard = () => {
  return (
    <Link
      to="/supplierDetails"
      className="bg-white shadow rounded-xl p-6 border-l-4 border-rose-500 flex items-center justify-between transition-transform duration-200 hover:scale-105 hover:shadow-lg"
    >
      <div>
        <p className="text-3xl font-bold text-gray-800"></p>
        <p className="text-sm text-gray-500">Total Supplier</p>
      </div>
      <div className="text-4xl text-rose-500">
        <FaUserTie />
      </div>
    </Link>
  );
};

export default TotalSupplierCard;
