import React, { useState, useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

const QuillEditor = ({ value, onChange }) => {
  const { quill, quillRef } = useQuill({
    theme: "snow",
    modules: {
      toolbar: [
        ["bold", "italic", "underline"],
        [{ font: [] }],
        [{ size: [] }],
        [{ color: [] }, { background: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        ["link", "image", "video"],
        ["blockquote", "code-block"],
        ["clean"],
      ],
    },
    formats: [
      "bold", "italic", "underline",
      "font", "size",
      "color", "background",
      "list", "bullet",
      "align",
      "link", "image", "video",
      "blockquote", "code-block"
    ],
  });

  // Set editor content if needed
  useEffect(() => {
    if (quill && value) {
      quill.root.innerHTML = value;
    }

    if (quill) {
      quill.on("text-change", () => {
        onChange(quill.root.innerHTML);
      });
    }
  }, [quill]);

  return (
    <div
      ref={quillRef}
      className="bg-white border border-gray-300 rounded overflow-y-auto"
      style={{
        width: "100%",
        height: "300px",
        whiteSpace: "pre-wrap",
        wordWrap: "break-word",
      }}
    />
  );
};

const AddProduct = () => {
  const [activeTab, setActiveTab] = useState("item");
  const [errors, setErrors] = useState({});
  const [details, setDetails] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!document.getElementById("itemInfo").value) {
      newErrors.itemInfo = "This field is required.";
    }
    if (!document.getElementById("category").value) {
      newErrors.category = "This field is required.";
    }
    setErrors(newErrors);

    console.log("Details content:", details);
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="bg-white shadow rounded-md p-6">
        {/* Tabs */}
        <div className="flex justify-between items-center mb-6">
          {["item", "web", "price", "image", "translation"].map((tab, index) => (
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

        {/* Item Tab */}
        {activeTab === "item" && (
          <div>
            <form className="grid grid-cols-2 gap-6">
              {/* Left */}
              <div className="space-y-4">
                <div>
                  <label className="block font-semibold text-gray-700 text-sm mb-1">
                    Item Information <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="itemInfo"
                    type="text"
                    placeholder="Item Information"
                    className={`w-full border px-3 py-2 text-sm ${
                      errors.itemInfo ? "border-red-600" : "border-gray-300"
                    }`}
                  />
                  {errors.itemInfo && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.itemInfo}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 text-sm mb-1">
                    Filter Type
                  </label>
                  <select className="w-full border border-gray-300 px-3 py-2 text-sm">
                    <option>Select option</option>
                  </select>
                </div>
              </div>

              {/* Right */}
              <div className="space-y-4">
                <div>
                  <label className="block font-semibold text-gray-700 text-sm mb-1">
                    Category <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="category"
                    className={`w-full border px-3 py-2 text-sm ${
                      errors.category ? "border-red-600" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select option</option>
                  </select>
                  {errors.category && (
                    <p className="text-red-600 text-xs mt-1">{errors.category}</p>
                  )}
                </div>
              </div>
            </form>

            {/* Quill */}
            <div className="mt-6">
              <label className="block font-semibold text-gray-700 text-sm mb-1">
                Details
              </label>
              <QuillEditor value={details} onChange={setDetails} />
            </div>
          </div>
        )}

        <div className="mt-6">
          <button
            onClick={validate}
            type="button"
            className="bg-green-600 text-white px-4 py-2 rounded text-sm"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
