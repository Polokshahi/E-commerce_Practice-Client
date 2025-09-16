import React from "react";
import { FaFileInvoice } from "react-icons/fa";
import { Link } from "react-router";

const TotalInvoiceCard = () => {
  return (
    <Link
      to="/invoiceDetails"
      className="bg-white shadow rounded-xl p-6 border-l-4 border-emerald-500 flex items-center justify-between transition-transform duration-200 hover:scale-105 hover:shadow-lg"
    >
      <div>
        <p className="text-3xl font-bold text-gray-800"></p>
        <p className="text-sm text-gray-500">Total Invoice</p>
      </div>
      <div className="text-4xl text-emerald-500">
        <FaFileInvoice />
      </div>
    </Link>
  );
};

export default TotalInvoiceCard;
