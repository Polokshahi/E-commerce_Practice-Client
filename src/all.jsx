import React from "react";

const AddProduct = () => {
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Top Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button className="bg-green-600 text-white px-4 py-2 rounded text-sm">+ Add Supplier</button>
        <button className="bg-green-600 text-white px-4 py-2 rounded text-sm">+ Add Category</button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm">+ Manage Product</button>
        <button className="bg-green-700 text-white px-4 py-2 rounded text-sm">+ Import Product (CSV)</button>
        <button className="bg-orange-500 text-white px-4 py-2 rounded text-sm">+ Product Ledger</button>
      </div>

      

      {/* Card */}
      <div className="bg-white shadow rounded-md p-6">
        {/* Stepper */}
        <div className="flex justify-between items-center border-b pb-4 mb-6 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <span className="w-6 h-6 flex items-center justify-center bg-green-600 text-white rounded-full text-xs">1</span>
            <span>Item Information</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-6 h-6 flex items-center justify-center bg-gray-200 text-gray-600 rounded-full text-xs">2</span>
            <span>Web Store</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-6 h-6 flex items-center justify-center bg-gray-200 text-gray-600 rounded-full text-xs">3</span>
            <span>Price</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-6 h-6 flex items-center justify-center bg-gray-200 text-gray-600 rounded-full text-xs">4</span>
            <span>Image</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-6 h-6 flex items-center justify-center bg-gray-200 text-gray-600 rounded-full text-xs">5</span>
            <span>Product Translation</span>
          </div>
        </div>

        {/* Form */}
        <form className="grid grid-cols-2 gap-6">
          {/* Left */}
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm mb-1">Item Information *</label>
              <input
                type="text"
                placeholder="Item Information"
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-1">Filter Type</label>
              <select className="w-full border rounded px-3 py-2 text-sm">
                <option>Select option</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-1">Warranty</label>
              <input
                type="text"
                placeholder="Please enter number of months"
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>
          </div>

          {/* Right */}
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm mb-1">Category *</label>
              <select className="w-full border rounded px-3 py-2 text-sm">
                <option>Select option</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-1">Filter Names</label>
              <select className="w-full border rounded px-3 py-2 text-sm">
                <option>Select option</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-1">Bar Code</label>
              <input
                type="text"
                placeholder="Please Enter Bar Code"
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>
          </div>
        </form>

        {/* Details */}
        <div className="mt-6">
          <label className="block text-gray-700 text-sm mb-1">Details</label>
          <textarea
            rows="6"
            className="w-full border rounded px-3 py-2 text-sm"
            placeholder="Enter product details..."
          />
        </div>

        {/* Invoice Details */}
        <div className="mt-6">
          <label className="block text-gray-700 text-sm mb-1">Invoice Details</label>
          <textarea
            rows="3"
            className="w-full border rounded px-3 py-2 text-sm"
            placeholder="Invoice Details"
          />
        </div>

        {/* Pagination Buttons */}
        <div className="flex justify-between mt-6">
          <div>
            <button className="px-4 py-2 border rounded text-sm">First</button>
            <button className="px-4 py-2 border rounded text-sm ml-2">Previous</button>
          </div>
          <div>
            <button className="px-4 py-2 border rounded text-sm mr-2">Next</button>
            <button className="px-4 py-2 border rounded text-sm">Last</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
