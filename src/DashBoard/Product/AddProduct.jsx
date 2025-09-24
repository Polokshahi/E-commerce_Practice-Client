import { useState, useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

// Quill Editor Component
const QuillEditor = ({ value, onChange, height = "200px" }) => {
  const { quill, quillRef } = useQuill({
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
      clipboard: {
        matchVisual: false,
      },
    },
    formats: [
      "bold",
      "italic",
      "underline",
      "font",
      "size",
      "color",
      "background",
      "list",
      "align",
      "link",
      "image",
      "video",
      "blockquote",
      "code-block",
    ],
  });

  useEffect(() => {
    if (!quill) return;

    // Set initial content only if it's different
    if (value && quill.root.innerHTML !== value) {
      quill.root.innerHTML = value;
    }

    // Set root element styles (LTR by default)
    quill.root.setAttribute("dir", "ltr");
    quill.root.style.textAlign = "left";
    quill.root.style.unicodeBidi = "plaintext";

    // Update value on text change
    quill.on("text-change", () => {
      onChange(quill.root.innerHTML);
    });
  }, [quill, value, onChange]);

  return (
    <div
      ref={quillRef}
      className="bg-white border border-gray-300 rounded-md"
      style={{
        height,
        overflowY: "auto",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
      }}
    />
  );
};

const commonProductUnits = ["Piece", "Set", "Pair", "Dozen", "Kilogram", "Gram", "Liter", "Milliliter", "Pack", "Box", "Bottle", "Tube", "Jar", "Can", "Bag", "Sheet", "Roll"];
const popularBrands = ["Samsung", "Apple", "Sony", "LG", "Dell", "HP", "Lenovo", "Asus", "Microsoft", "Nintendo", "Nike", "Adidas", "Puma", "Zara", "H&M", "Levi's", "Under Armour", "Uniqlo", "Gucci", "Louis Vuitton", "Razer", "Logitech", "Corsair", "MSI", "Alienware", "HyperX"];
const supplierName = ["ABC Supplier", "XYZ Supplier", "123 Supplier", "456 Supplier", "789 Supplier", "Supplier 1", "Supplier 2", "Supplier 3", "Supplier 4", "Supplier 5", "Supplier 6", "Supplier 7", "Supplier 8", "Supplier 9", "Supplier 10"];
const productCategories = ["Electronics", "Clothing", "Home & Kitchen", "Beauty & Personal Care", "Sports & Outdoors", "Books & Stationery", "Toys & Baby Products", "Health & Wellness", "Automotive", "Pet Supplies", "Jewelry & Accessories", "Footwear", "Groceries & Gourmet Food", "Office Supplies", "Garden & Outdoor", "Smart Home Devices", "Gaming & Consoles", "Travel & Luggage", "Music & Instruments", "Art & Craft Supplies", "Software & Subscriptions", "Industrial & Tools"];



// Main Component
const AddProduct = () => {
const tabs = ["item", "web", "price", "image", "translation"];
const [activeTab, setActiveTab] = useState("item");
const [errors, setErrors] = useState({});

const validate = () => {
  const newErrors = {};
  if (!formData.itemInfo.trim()) newErrors.itemInfo = "This field is required.";
  if (!formData.category.trim()) newErrors.category = "This field is required.";
 

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};





const validatePriceFields = () => {
  const newErrors = {};

  if (!formData.sellPrice || formData.sellPrice.toString().trim() === "") {
    newErrors.sellPrice = "Sell Price is required";
  }
  if (!formData.supplierPrice || formData.supplierPrice.toString().trim() === "") {
    newErrors.supplierPrice = "Supplier Price is required";
  }
  if (!formData.itemCode || formData.itemCode.trim() === "") {
    newErrors.itemCode = "Item Code is required";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};













const goNext = () => {
  const currentIndex = tabs.indexOf(activeTab);

  // Item tab validation
  if (activeTab === "item" && !validate()) return;

  // Price tab validation
  if (activeTab === "price") {
    if (!validatePriceFields()) return; // stop next if errors exist
  }

  if (currentIndex < tabs.length - 1) {
    setActiveTab(tabs[currentIndex + 1]);
  }
};

const goPrev = () => {
  const currentIndex = tabs.indexOf(activeTab);
  if (currentIndex > 0) setActiveTab(tabs[currentIndex - 1]);
};

const goFirst = () => setActiveTab(tabs[0]);
const goLast = () => setActiveTab(tabs[tabs.length - 1]);
const isFirstTab = activeTab === tabs[0];
const isLastTab = activeTab === tabs[tabs.length - 1];

// Cloudinary image upload
const [images, setImages] = useState([null]);
const [uploadedUrls, setUploadedUrls] = useState({});
const cloudName = "dhposuwdg";
const uploadPreset = "Ecommerce";

const handleDefaultUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.secure_url) setUploadedUrls((prev) => ({ ...prev, default: data.secure_url }));
  } catch (err) {
    console.error("Cloudinary upload error (default):", err);
  }
};

const handleDynamicUpload = async (e, index) => {
  const file = e.target.files[0];
  if (!file) return;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.secure_url) setUploadedUrls((prev) => ({ ...prev, [index]: data.secure_url }));
  } catch (err) {
    console.error(`Cloudinary upload error (image ${index}):`, err);
  }
};

const addImageInput = () => setImages((prev) => [...prev, null]);
const removeImageInput = (index) => {
  setImages((prev) => prev.filter((_, i) => i !== index));
  setUploadedUrls((prev) => {
    const updated = { ...prev };
    delete updated[index];
    return updated;
  });
};

const [blocks, setBlocks] = useState([
  { id: Date.now(), language: "", details: "", description: "", specifications: "" },
]);

const addBlock = () => {
  setBlocks((prev) => [
    ...prev,
    { id: Date.now(), language: "", details: "", description: "", specifications: "" },
  ]);
};

const removeBlock = (id) => {
  setBlocks((prev) => prev.filter((b) => b.id !== id));
};

const [variants, setVariants] = useState([]);
const [showVariants, setShowVariants] = useState(false);

const handleAdd = () => {
  setVariants([...variants, { size: "", color: "", price: "" }]);
};

const handleRemove = (index) => {
  const updated = [...variants];
  updated.splice(index, 1);
  setVariants(updated);
};

const handleChanges = (index, field, value) => {
  const updated = [...variants];
  updated[index][field] = value;
  setVariants(updated);
};

const handleFormChange = (field, value) => {
  setFormData({ ...formData, [field]: value });
};

const handleSubmit = (e) => {
  e.preventDefault();
  console.log("Submitted");
};

const handleBlockChange = (id, field, value) => {
  setFormData((prev) => ({
    ...prev,
    blocks: prev.blocks.map((b) =>
      b.id === id ? { ...b, [field]: value } : b
    ),
  }));
};

const [formData, setFormData] = useState({
  itemInfo: "",
  category: "",
  filterType: "",
  warrantee: "",
  filterNames: "",
  barCode: "",
  invoiceDetails: "",
  details: "",
  unit: "",
  brand: "",
  type: "",
  tag: "",
  bestSale: "",
  review: "",
  description: "",
  specifications: "",
  sellPrice: "",
  supplierPrice: "",
  offer: "",
  itemCode: "",
  supplier: "",
  varient: "",
  defaultVarient: "",
  color: "",
  videoLink: "",
  defaultImage: "", // Default image
  images: [""], // Dynamic images
  blocks: [
    { id: Date.now(), language: "", details: "", description: "", specifications: "" },
  ],
});

console.log(formData);


// const [requiredFields, setRequiredFields] = useState(false);




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
                className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${activeTab === tab ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
              >
                {index + 1}
              </span>
              <span className={`${activeTab === tab ? "text-green-600 font-semibold" : "text-gray-700"}`}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </span>
            </button>
          ))}
        </div>

        {/* ITEM TAB */}
        {/* ITEM TAB */}
        {activeTab === "item" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                {/* Item Information */}
                <div>
                  <label className="block font-semibold text-gray-700 text-sm mb-1">
                    Item Information <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Item Information"
                    value={formData.itemInfo}
                    onChange={(e) =>
                      setFormData({ ...formData, itemInfo: e.target.value })
                    }
                    className={`w-full border px-3 py-2 text-sm ${errors.itemInfo ? "border-red-600" : "border-gray-300"
                      }`}
                  />
                  {errors.itemInfo && (
                    <p className="text-red-600 text-xs mt-1">{errors.itemInfo}</p>
                  )}
                </div>

                {/* Filter Type */}
                <div>
                  <label className="block font-semibold text-gray-700 text-sm mb-1">
                    Filter Type
                  </label>
                  <input
                    type="text"
                    placeholder="Filter Type"
                    value={formData.filterType || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, filterType: e.target.value })
                    }
                    className="w-full border px-3 py-2 text-sm border-gray-300"
                  />
                </div>

                {/* Warrantee */}
                <div>
                  <label className="block font-semibold text-gray-700 text-sm mb-1">
                    Warrantee (Months)
                  </label>
                  <input
                    type="number"
                    placeholder="Enter number of months"
                    value={formData.warrantee || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, warrantee: e.target.value })
                    }
                    className="w-full border border-gray-300 px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-4">
                {/* Category */}
                <div>
                  <label className="block font-semibold text-gray-700 text-sm mb-1">
                    Category <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className={`w-full border px-3 py-2 text-sm ${errors.category ? "border-red-600" : "border-gray-300"
                      }`}
                  >
                    <option disabled value="">
                      --
                    </option>
                    {productCategories.map((cat, idx) => (
                      <option className="text-black" key={idx} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-red-600 text-xs mt-1">{errors.category}</p>
                  )}
                </div>

                {/* Filter Names */}
                <div>
                  <label className="block font-semibold text-gray-700 text-sm mb-1">
                    Filter Names
                  </label>
                  <input
                    type="text"
                    placeholder="Filter Names"
                    value={formData.filterNames || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, filterNames: e.target.value })
                    }
                    className="w-full border px-3 py-2 text-sm border-gray-300"
                  />
                </div>

                {/* Bar Code */}
                <div>
                  <label className="block font-semibold text-gray-700 text-sm mb-1">
                    Bar Code
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Bar Code"
                    value={formData.barCode || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, barCode: e.target.value })
                    }
                    className="w-full border px-3 py-2 text-sm border-gray-300"
                  />
                </div>
              </div>
            </div>

            {/* Details */}
            <div>
              <label className="block font-semibold text-gray-700 text-sm mb-1">
                Details
              </label>
              <QuillEditor
                value={formData.details}
                onChange={(value) => setFormData({ ...formData, details: value })} height="200px" />
            </div>

            {/* Invoice Details */}
            <div className="grid grid-cols-3 gap-6 mt-6 pt-4">
              <div className="col-span-3 flex flex-col gap-2">
                <label className="block font-semibold text-gray-700 text-sm mb-1">
                  Invoice Details
                </label>
                <textarea
                  placeholder="Invoice Details"
                  value={formData.invoiceDetails || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, invoiceDetails: e.target.value })
                  }
                  className="w-full border border-gray-300 px-3 py-2 text-sm rounded-md"
                />
              </div>
            </div>
          </div>
        )}


        {/* WEB TAB */}
        {activeTab === "web" && (
          <div>
            <div className="grid grid-cols-2 gap-6 mb-8">
              {/* Unit */}
              <div className="flex items-center">
                <label className="w-20 font-semibold text-gray-700 text-sm">Unit</label>
                <select
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  className="border border-gray-300 rounded-md px-3 py-2 w-[120px] text-sm select"
                >
                  <option value="" disabled>Select Unit</option>
                  {commonProductUnits.map((unit, idx) => (
                    <option className="text-black" key={idx} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>

              {/* Brand */}
              <div className="flex items-center">
                <label className="w-20 font-semibold text-gray-700 text-sm">Brand</label>
                <select
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className="border border-gray-300 rounded-md px-3 py-2 w-[120px] text-sm select"
                >
                  <option value="" disabled>Select Brand</option>
                  {popularBrands.map((brand, idx) => (
                    <option className="text-black" key={idx} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8 items-center">
              {/* Type */}
              <div className="flex items-center gap-[50px]">
                <div className="block font-semibold text-gray-700 text-sm mb-1">Type</div>
                <input
                  type="text"
                  placeholder="Type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-[400px] border rounded border-gray-300 px-3 py-2 text-sm"
                />
              </div>

              {/* Tag */}
              <div className="flex items-center gap-[60px]">
                <div className="block font-semibold text-gray-700 text-sm mb-1">Tag</div>
                <input
                  type="text"
                  placeholder="Tag"
                  value={formData.tag}
                  onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                  className="w-[400px] rounded border border-gray-300 px-3 py-2 text-sm"
                />
              </div>

              {/* Best Sale */}
              <div className="flex items-center">
                <label className="w-20 font-semibold text-gray-700 text-sm">Best Sale</label>
                <select
                  value={formData.bestSale}
                  onChange={(e) => setFormData({ ...formData, bestSale: e.target.value })}
                  className="border border-gray-300 rounded-md px-2 py-2 w-[120px] text-sm"
                >
                  <option value="" disabled>Select option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Review */}
              <div>
                <label className="block font-semibold text-gray-700 text-sm mb-1">
                  Review
                </label>
                <QuillEditor
                  value={formData.review}
                  onChange={(value) => setFormData({ ...formData, review: value })}
                  height="180px"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block font-semibold text-gray-700 text-sm mb-1">
                  Description
                </label>
                <QuillEditor
                  value={formData.description}
                  onChange={(value) => setFormData({ ...formData, description: value })}
                  height="180px"
                />
              </div>

              {/* Specifications */}
              <div className="col-span-2">
                <label className="block font-semibold text-gray-700 text-sm mb-1">
                  Specifications
                </label>
                <QuillEditor
                  value={formData.specifications}
                  onChange={(value) =>
                    setFormData({ ...formData, specifications: value })
                  }
                  height="220px"
                />
              </div>
            </div>
          </div>

        )}

        {/* PRICE TAB */}
        {activeTab === "price" && (
        <div className="flex justify-center items-center md:flex-col md:items-center md:justify-center lg:flex-col lg:justify-center lg:items-center lg:mr-[200px]">
      {/* Sell Price */}
     <div className="flex flex-col mt-4">
  <div className="flex items-center">
    <label className="w-40 text-right text-sm font-semibold text-gray-700">
      Sell Price <span className="text-red-500">*</span>
    </label>
    <input
      type="number"
      placeholder="Sell Price"
      value={formData.sellPrice}
      onChange={(e) => handleFormChange("sellPrice", e.target.value)}
      className={`ml-4 flex-1 w-[300px] border rounded px-2 py-1 text-right focus:outline-none ${
        errors.sellPrice ? "border-red-500" : "border-gray-400"
      }`}
    />
  </div>
  {errors.sellPrice && (
    <p className="text-red-500 text-xs ml-[160px] mt-1">{errors.sellPrice}</p>
  )}
</div>

    



      {/* Supplier Price */}
     <div className="flex flex-col mt-4">
  <div className="flex items-center">
    <label className="w-40 text-right text-sm font-semibold text-gray-700">
      Supplier Price <span className="text-red-500">*</span>
    </label>
    <input
      type="number"
      placeholder="0"
      value={formData.supplierPrice}
      onChange={(e) => handleFormChange("supplierPrice", e.target.value)}
      className={`ml-4 flex-1 w-[300px] border rounded px-2 py-1 text-right focus:outline-none ${
        errors.supplierPrice ? "border-red-500" : "border-gray-400"
      }`}
    />
  </div>
  {errors.supplierPrice && (
    <p className="text-red-500 text-xs ml-[160px] mt-1">{errors.supplierPrice}</p>
  )}
</div>


      
    

      

      {/* Offer */}
      <div className="mt-4 flex items-center mr-[230px]">
        <label className="w-40 text-right text-sm font-semibold text-gray-700">
          Offer 
        </label>
        <select
          value={formData.offer}
          onChange={(e) => handleFormChange("offer", e.target.value)}
          className="ml-4 flex-1 w-[70px] border border-gray-400 rounded px-2 py-1 text-center focus:outline-none focus:border-dotted"
        >
          <option value="">--</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      {/* Item Code */}
     <div className="flex flex-col mt-4">
  <div className="flex items-center">
    <label className="w-40 text-right text-sm font-semibold text-gray-700">
      Item Code <span className="text-red-500">*</span>
    </label>
    <input
      type="text"
      placeholder="Item Code"
      value={formData.itemCode}
      onChange={(e) => handleFormChange("itemCode", e.target.value)}
      className={`ml-4 flex-1 w-[300px] border rounded px-2 py-1 focus:outline-none ${
        errors.itemCode ? "border-red-500" : "border-gray-400"
      }`}
    />
  </div>
  {errors.itemCode && (
    <p className="text-red-500 text-xs ml-[160px] mt-1">{errors.itemCode}</p>
  )}
</div>

    


      {/* Supplier */}
      <div className="flex items-center mt-4">
        <label className="w-40 text-right text-sm font-semibold text-gray-700">
          Supplier 
        </label>
        <select
          value={formData.supplier}
          onChange={(e) => handleFormChange("supplier", e.target.value)}
          className="ml-4 flex-1 w-[300px] border border-gray-400 rounded px-2 py-1 focus:outline-none focus:border-dotted"
        >
          <option value="">--</option>
          {supplierName.map((supplier, idx) => (
            <option key={idx} value={supplier}>{supplier}</option>
          ))}
        </select>
      </div>

      {/* Varient */}
      <div className="flex items-center mt-4">
        <label className="w-40 text-right text-sm font-semibold text-gray-700">
          Varient 
        </label>
        <select
          value={formData.varient}
          onChange={(e) => handleFormChange("varient", e.target.value)}
          className="ml-4 flex-1 w-[300px] border border-gray-400 rounded px-2 py-1 focus:outline-none focus:border-dotted appearance-none"
        >
          <option value="">--</option>
          <option value="small">Small</option>
          <option value="Lerge">Lerge</option>
          <option value="Medium">Medium</option>
          <option value="Extra Lerge">Extra Lerge</option>
        </select>
      </div>

      {/* Default Varient */}
      <div className="flex items-center mt-4">
        <label className="w-40 text-right text-sm font-semibold text-gray-700">
          Default Varient 
        </label>
        <select
          value={formData.defaultVarient}
          onChange={(e) => handleFormChange("defaultVarient", e.target.value)}
          className="ml-4 flex-1 w-[300px] border border-gray-400 rounded px-2 py-1 focus:outline-none focus:border-dotted appearance-none"
        >
          <option value="">--</option>
        </select>
      </div>

      {/* Color */}
      <div className="flex items-center mt-4">
        <label className="w-40 text-right text-sm font-semibold text-gray-700">
          Color
        </label>
        <select
          value={formData.color}
          onChange={(e) => handleFormChange("color", e.target.value)}
          className="ml-4 flex-1 w-[300px] border border-gray-400 rounded px-2 py-1 text-left focus:outline-none appearance-none"
        >
          <option value="" disabled hidden></option>
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
        </select>
      </div>

      {/* Variants Table */}
      <div className="items-center mt-4 ml-[300px]">
        <label className="flex items-center space-x-2 mb-2">
          <input
            type="checkbox"
            checked={showVariants}
            onChange={(e) => {
              setShowVariants(e.target.checked);
              if (e.target.checked && variants.length === 0) {
                setVariants([{ size: "", color: "", price: "" }]);
              } else if (!e.target.checked) {
                setVariants([]);
              }
            }}
          />
          <span className="text-gray-700 font-medium text-sm">
            Set Variant Wise Price
          </span>
        </label>

        <div
          style={{ transform: showVariants ? "scaleX(1)" : "scaleX(0)" }}
          className={`mt-3 p-4 border border-gray-300 rounded bg-gray-50 
            transition-transform duration-700 origin-left w-[500px] 
            ${showVariants ? "opacity-100" : "opacity-0 h-0 overflow-hidden"}`}
        >
          <table className="w-full text-sm text-left border border-collapse">
            <thead>
              <tr className="bg-white border-b text-gray-700 font-medium">
                <th className="px-2 py-2 border text-red-600">Size<span className="text-red-600">*</span></th>
                <th className="px-2 py-2 border text-red-600">Color<span className="text-red-600">*</span></th>
                <th className="px-2 py-2 border text-red-600">Price<span className="text-red-600">*</span></th>
                <th className="px-2 py-2 border text-blue-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {variants.map((variant, index) => (
                <tr key={index}>
                  <td className="px-2 py-1 border">
                    <select
                      value={variant.size}
                      onChange={(e) => handleChanges(index, "size", e.target.value)}
                      className="w-full border border-gray-300 px-2 py-1 rounded text-sm"
                    >
                      <option value="">Select option</option>
                      <option>Small</option>
                      <option>Medium</option>
                      <option>Large</option>
                    </select>
                  </td>
                  <td className="px-2 py-1 border">
                    <select
                      value={variant.color}
                      onChange={(e) => handleChanges(index, "color", e.target.value)}
                      className="w-full border border-gray-300 px-2 py-1 rounded text-sm"
                    >
                      <option value="">Select option</option>
                      <option>Red</option>
                      <option>Blue</option>
                      <option>Green</option>
                    </select>
                  </td>
                  <td className="px-2 py-1 border">
                    <input
                      type="number"
                      value={variant.price}
                      onChange={(e) => handleChanges(index, "price", e.target.value)}
                      className="w-full border border-gray-300 px-2 py-1 rounded text-sm"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="px-2 py-1 border text-center">
                    {index === 0 ? (
                      <button
                        onClick={handleAdd}
                        className="bg-sky-400 hover:bg-sky-500 text-white text-sm font-semibold px-3 py-1 rounded"
                      >
                        Add
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRemove(index)}
                        className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded"
                      >
                        Remove
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Video Link */}
      <div className="flex items-center mt-4 mb-8">
        <label className="w-40 text-right text-sm font-semibold text-gray-700">
          Video Link <span className="text-red-500">*</span>
        </label>
        <input
          type="url"
          value={formData.videoLink}
          onChange={(e) => handleFormChange("videoLink", e.target.value)}
          className="ml-4 flex-1 w-[300px] border border-gray-400 rounded px-2 py-1 focus:outline-none focus:border-dotted"
        />
      </div>
    </div>
          
        )}

        {/* IMAGE TAB */}
        {activeTab === "image" && (
         <div className="space-y-6">
      {/* Default Image */}
      <div>
        <div className="flex gap-4 items-center">
          <label className=" font-semibold mb-1 text-right text-gray-700">
            Default image
          </label>
          <input
            type="file"
            className="block file-input text-sm text-gray-900 border"
            onChange={handleDefaultUpload}
          />
        </div>
        {uploadedUrls.default && (
          <p className="text-sm text-gray-600 mt-1">
            Uploaded:{" "}
            <a
              href={uploadedUrls.default}
              className="text-blue-500 underline"
              target="_blank"
              rel="noreferrer"
            >
              <img src={uploadedUrls.default} alt="" className="h-16 w-16 object-cover rounded" />
            </a>
          </p>
        )}
      </div>

      {/* Dynamic Images */}
      <div className="mb-4">
        <div className="flex flex-col gap-4 mx-8">
          {images.map((_, index) => (
            <div key={index} className="flex items-center space-x-2">
              <label className="w-16 font-medium">Image {index + 1}</label>
              <input
                type="file"
                className="file-input text-sm text-gray-900"
                onChange={(e) => handleDynamicUpload(e, index)}
              />
              <button
                type="button"
                className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-1 px-3 rounded"
                onClick={addImageInput}
              >
                +
              </button>
              <button
                type="button"
                className={`bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded ${
                  images.length === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => removeImageInput(index)}
                disabled={images.length === 1}
              >
                −
              </button>
              {uploadedUrls[index] && (
                <img
                  src={uploadedUrls[index]}
                  alt={`Uploaded ${index}`}
                  className="h-16 w-16 object-cover rounded"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
        )}

        {/* TRANSLATION TAB */}
        {activeTab === "translation" &&


         <div className="space-y-6">
  {formData.blocks.map((block, index) => (
    <div key={block.id} className="border p-4 rounded-md space-y-4 relative">

      {/* Language selector + add/remove */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 gap-2">
        <label className="font-semibold text-gray-700 text-sm">Language</label>
        <select
          className="border border-gray-300 rounded px-3 py-2 w-full sm:w-64 text-sm"
          value={block.language}
          onChange={(e) => handleBlockChange(block.id, "language", e.target.value)}
        >
          <option value="" disabled>Select language</option>
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
        </select>

        {index === 0 ? (
          <button
            type="button"
            onClick={addBlock}
            className="ml-2 text-green-600 font-bold text-xl"
          >
            +
          </button>
        ) : (
          <button
            type="button"
            onClick={() => removeBlock(block.id)}
            className="ml-2 text-red-600 font-bold text-xl"
          >
            −
          </button>
        )}
      </div>

      {/* Full-width Details Editor */}
      <div>
        <label className="block font-semibold text-gray-700 text-sm mb-1">Details</label>
        <QuillEditor
          value={block.details}
          onChange={(value) => handleBlockChange(block.id, "details", value)}
          height="200px"
        />
      </div>

      {/* Side-by-side Editors */}
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="w-full md:flex-1">
          <label className="block font-semibold text-gray-700 text-sm mb-1">Description</label>
          <QuillEditor
            value={block.description}
            onChange={(value) => handleBlockChange(block.id, "description", value)}
            height="180px"
          />
        </div>
        <div className="w-full md:flex-1">
          <label className="block font-semibold text-gray-700 text-sm mb-1">Specifications</label>
          <QuillEditor
            value={block.specifications}
            onChange={(value) => handleBlockChange(block.id, "specifications", value)}
            height="180px"
          />
        </div>
      </div>
    </div>
  ))}
</div>


        }

        {/* Navigation */}
        <div className="flex justify-between items-center mt-6">
          <div className="space-x-2">
            <button type="button" onClick={goFirst} disabled={isFirstTab} className={`px-4 py-2 border rounded-md ${isFirstTab ? "text-gray-400 cursor-not-allowed" : "text-gray-600"}`}>First</button>
            <button type="button" onClick={goPrev} disabled={isFirstTab} className={`px-4 py-2 border rounded-md ${isFirstTab ? "text-gray-400 cursor-not-allowed" : "text-gray-600"}`}>Previous</button>
          </div>
          <div className="space-x-2">
            <button type="button" onClick={goNext} disabled={isLastTab} className={`px-4 py-2 border rounded-md ${isLastTab ? "text-gray-400 cursor-not-allowed" : "text-green-600"}`}>Next</button>
            <button type="button" onClick={goLast} disabled={isLastTab} className={`px-4 py-2 border rounded-md ${isLastTab ? "text-gray-400 cursor-not-allowed" : "text-green-600"}`}>Last</button>
            {isLastTab && <button onClick={handleSubmit} className="px-4 py-2 border rounded-md bg-green-600 text-white">Submit</button>}

          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
