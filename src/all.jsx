import React, { useState, useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

// Quill Editor Component
const QuillEditor = () => {
  const { quillRef } = useQuill({
    theme: "snow",
    modules: {
      toolbar: [
        ["bold", "italic", "underline"],
        [{ font: [] }],
        [{ size: [] }],
        [{ color: [] }, { background: [] }],
        [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
        ["link", "image", "video"],
        ["blockquote", "code-block"],
        ["clean"],
      ],
    },
  });

  return (
    <div
      ref={quillRef}
      className="bg-white border border-gray-300 rounded-md"
      style={{
        height: "200px",
        overflowX: "hidden",
        overflowY: "hidden",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
      }}
    />
  );
};

// Main Component
const AddProduct = () => {
  const tabs = ["item", "web", "price", "image", "translation"];
  const [activeTab, setActiveTab] = useState("item");

  // Navigation functions
  const goNext = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) setActiveTab(tabs[currentIndex + 1]);
  };

  const goPrev = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex > 0) setActiveTab(tabs[currentIndex - 1]);
  };

  const goFirst = () => setActiveTab(tabs[0]);
  const goLast = () => setActiveTab(tabs[tabs.length - 1]);

  const isFirstTab = activeTab === tabs[0];
  const isLastTab = activeTab === tabs[tabs.length - 1];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow rounded-md p-6">
        {/* Tabs */}
        <div className="flex justify-between items-center mb-6">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex items-center space-x-2 text-sm focus:outline-none"
            >
              <span
                className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                  activeTab === tab
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {index + 1}
              </span>
              <span
                className={`${
                  activeTab === tab
                    ? "text-green-600 font-semibold"
                    : "text-gray-700"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "item" && (
          <div className="grid grid-cols-2 gap-6">
            {/* Left */}
            <div className="space-y-4">
              <div>
                <label className="block font-semibold text-gray-700 text-sm mb-1">
                  Item Information <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Item Information"
                  className="w-full border border-gray-300 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 text-sm mb-1">
                  Filter Type
                </label>
                <select className="w-full border border-gray-300 px-3 py-2 text-sm">
                  <option>Select option</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 text-sm mb-1">
                  Warrantee
                </label>
                <input
                  type="text"
                  placeholder="Please enter number of months"
                  className="w-full border border-gray-300 px-3 py-2 text-sm"
                />
              </div>
            </div>

            {/* Right */}
            <div className="space-y-4">
              <div>
                <label className="block font-semibold text-gray-700 text-sm mb-1">
                  Category <span className="text-red-600">*</span>
                </label>
                <select className="w-full border border-gray-300 px-3 py-2 text-sm">
                  <option value="">Select option</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 text-sm mb-1">
                  Filter Names
                </label>
                <select className="w-full border border-gray-300 px-3 py-2 text-sm">
                  <option>Select option</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 text-sm mb-1">
                  Bar Code
                </label>
                <input
                  type="text"
                  placeholder="Please Enter Bar Code"
                  className="w-full border border-gray-300 px-3 py-2 text-sm"
                />
              </div>
            </div>

            {/* Quill Editor */}
            <div className="col-span-2 mt-4">
              <label className="block font-semibold text-gray-700 text-sm mb-1">
                Details
              </label>
              <QuillEditor />
            </div>
          </div>
        )}

        {activeTab === "web" && <p>Web Tab Content</p>}
        {activeTab === "price" && <p>Price Tab Content</p>}
        {activeTab === "image" && <p>Image Tab Content</p>}
        {activeTab === "translation" && <p>Translation Tab Content</p>}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-6">
          <div className="space-x-2">
            <button
              type="button"
              onClick={goFirst}
              disabled={isFirstTab}
              className={`px-4 py-2 border rounded-md ${
                isFirstTab ? "text-gray-400 cursor-not-allowed" : "text-gray-600"
              }`}
            >
              First
            </button>
            <button
              type="button"
              onClick={goPrev}
              disabled={isFirstTab}
              className={`px-4 py-2 border rounded-md ${
                isFirstTab ? "text-gray-400 cursor-not-allowed" : "text-gray-600"
              }`}
            >
              Previous
            </button>
          </div>

          <div className="space-x-2">
            <button
              type="button"
              onClick={goNext}
              disabled={isLastTab}
              className={`px-4 py-2 border rounded-md ${
                isLastTab ? "text-gray-400 cursor-not-allowed" : "text-green-600"
              }`}
            >
              Next
            </button>
            <button
              type="button"
              onClick={goLast}
              disabled={isLastTab}
              className={`px-4 py-2 border rounded-md ${
                isLastTab ? "text-gray-400 cursor-not-allowed" : "text-green-600"
              }`}
            >
              Last
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
