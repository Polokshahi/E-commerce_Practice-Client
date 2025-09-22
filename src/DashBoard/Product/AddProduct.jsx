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

const commonProductUnits = ["Piece","Set","Pair","Dozen","Kilogram","Gram","Liter","Milliliter","Pack","Box","Bottle","Tube","Jar","Can","Bag","Sheet","Roll"];
const popularBrands = ["Samsung","Apple","Sony","LG","Dell","HP","Lenovo","Asus","Microsoft","Nintendo","Nike","Adidas","Puma","Zara","H&M","Levi's","Under Armour","Uniqlo","Gucci","Louis Vuitton","Razer","Logitech","Corsair","MSI","Alienware","HyperX"];
const supplierName = ["ABC Supplier","XYZ Supplier","123 Supplier","456 Supplier","789 Supplier","Supplier 1","Supplier 2","Supplier 3","Supplier 4","Supplier 5","Supplier 6","Supplier 7","Supplier 8","Supplier 9","Supplier 10"];


// Main Component
const AddProduct = () => {
  const tabs = ["item", "web", "price", "image", "translation"];
  const [activeTab, setActiveTab] = useState("item");
  const [errors, setErrors] = useState({});
  const [showDiv, setShowDiv] = useState(false);
  const [formData, setFormData] = useState({ itemInfo: "", category: "" });
  const [details, setDetails] = useState("");
  const [review, setReview] = useState("");
  const [description, setDescription] = useState("");
  const [specifications, setSpecifications] = useState("");
  const [invoice, setInvoice] = useState({
    invoiceNo: "",
    invoiceDate: "",
    totalAmount: "",
  });

  const validate = () => {
    const newErrors = {};
    if (!formData.itemInfo.trim()) newErrors.itemInfo = "This field is required.";
    if (!formData.category.trim()) newErrors.category = "This field is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goNext = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (activeTab === "item" && !validate()) return;
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
                  activeTab === tab ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"
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
        {activeTab === "item" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block font-semibold text-gray-700 text-sm mb-1">
                    Item Information <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Item Information"
                    value={formData.itemInfo}
                    onChange={(e) => setFormData({ ...formData, itemInfo: e.target.value })}
                    className={`w-full border px-3 py-2 text-sm ${
                      errors.itemInfo ? "border-red-600" : "border-gray-300"
                    }`}
                  />
                  {errors.itemInfo && <p className="text-red-600 text-xs mt-1">{errors.itemInfo}</p>}
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 text-sm mb-1">Filter Type</label>
                  <select className="w-full border border-gray-300 px-3 py-2 text-sm">
                    <option>Select option</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 text-sm mb-1">Warrantee</label>
                  <input
                    type="text"
                    placeholder="Please enter number of months"
                    className="w-full border border-gray-300 px-3 py-2 text-sm"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block font-semibold text-gray-700 text-sm mb-1">
                    Category <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className={`w-full border px-3 py-2 text-sm ${
                      errors.category ? "border-red-600" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select option</option>
                  </select>
                  {errors.category && <p className="text-red-600 text-xs mt-1">{errors.category}</p>}
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 text-sm mb-1">Filter Names</label>
                  <select className="w-full border border-gray-300 px-3 py-2 text-sm">
                    <option>Select option</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 text-sm mb-1">Bar Code</label>
                  <input
                    type="text"
                    placeholder="Please Enter Bar Code"
                    className="w-full border border-gray-300 px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block font-semibold text-gray-700 text-sm mb-1">Details</label>
              <QuillEditor value={details} onChange={setDetails} height="200px" />
            </div>
            <div className="grid grid-cols-3 gap-6 mt-6 pt-4">
              <div className="col-span-3 flex flex-col gap-2">
                <label className="block font-semibold text-gray-700 text-sm mb-1">Invoice Details</label>
                <textarea
                  placeholder="Invoice Details"
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
              <div className="flex items-center">
                <label className="w-20 font-semibold text-gray-700 text-sm">Unit</label>
                <select className="border border-gray-300 rounded-md px-3 py-2 w-[120px] text-sm select" defaultValue="">
                  <option value="" disabled>Select Unit</option>
                  {commonProductUnits.map((unit, idx) => (
                    <option className="text-black" key={idx} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center">
                <label className="w-20 font-semibold text-gray-700 text-sm">Brand</label>
                <select className="border border-gray-300 rounded-md px-3 py-2 w-[120px] text-sm select" defaultValue="">
                  <option value="" disabled>Select Brand</option>
                  {popularBrands.map((brand, idx) => (
                    <option className="text-black" key={idx} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 mb-8 items-center">
              <div className="flex items-center gap-[50px]">
                <div className="block font-semibold text-gray-700 text-sm mb-1">Type</div>
                <input type="text" placeholder="Type" className="w-[400px] border rounded border-gray-300 px-3 py-2 text-sm" />
              </div>
              <div className="flex items-center gap-[60px]">
                <div className="block font-semibold text-gray-700 text-sm mb-1">Tag</div>
                <input type="text" placeholder="Tag" className="w-[400px] rounded border border-gray-300 px-3 py-2 text-sm" />
              </div>
              <div className="flex items-center">
                <label className="w-20 font-semibold text-gray-700 text-sm">Best Sale</label>
                <select className="border border-gray-300 rounded-md px-2 py-2 w-[120px] text-sm" defaultValue="">
                  <option value="" disabled>select option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold text-gray-700 text-sm mb-1">Review</label>
                <QuillEditor value={review} onChange={setReview} height="180px" />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 text-sm mb-1">Description</label>
                <QuillEditor value={description} onChange={setDescription} height="180px" />
              </div>
              <div className="col-span-2">
                <label className="block font-semibold text-gray-700 text-sm mb-1">Specifications</label>
                <QuillEditor value={specifications} onChange={setSpecifications} height="220px" />
              </div>
            </div>
          </div>
        )}

        {/* PRICE TAB */}
        {activeTab === "price" && (
          <div className="flex justify-center items-center md:flex-col md:items-center md:justify-center lg:flex-col lg:justify-center lg:items-center lg:mr-[200px]">
            <div className="flex items-center mt-4">
              <label className="w-40 text-right text-sm font-semibold text-gray-700">Sell Price <span className="text-red-500">*</span></label>
              <input type="number" placeholder="Sell Price" className="ml-4 flex-1 w-[300px] border border-gray-400 rounded px-2 py-1 text-right focus:outline-none focus:border-dotted" />
            </div>
            <div className="flex items-center mt-4">
              <label className="w-40 text-right text-sm font-semibold text-gray-700">Supplier Price <span className="text-red-500">*</span></label>
              <input type="number" placeholder="0" className="ml-4 flex-1 w-[300px] border border-gray-400 rounded px-2 py-1 text-right focus:outline-none focus:border-dotted" />
            </div>
            <div className="mt-4 flex items-center mr-[230px]">
              <label className="w-40 text-right text-sm font-semibold text-gray-700">Offer <span className="text-red-500">*</span></label>
              <select defaultValue="" className="ml-4 flex-1 w-[70px] border border-gray-400 rounded px-2 py-1 text-center focus:outline-none focus:border-dotted">
                <option value="">--</option>
                <option className="text-black" value="Yes">Yes</option>
                <option className="text-black" value="No">No</option>
              </select>
            </div>
            <div className="flex items-center mt-4">
              <label className="w-40 text-right text-sm font-semibold text-gray-700">Item Code <span className="text-red-500">*</span></label>
              <input type="text" placeholder="Item Code" className="ml-4 flex-1 w-[300px] border border-gray-400 rounded px-2 py-1 focus:outline-none focus:border-dotted" />
            </div>
            <div className="flex items-center mt-4">
              <label className="w-40 text-right text-sm font-semibold text-gray-700">Supplier <span className="text-red-500">*</span></label>
              <select className="ml-4 flex-1 w-[300px] border border-gray-400 rounded px-2 py-1 focus:outline-none focus:border-dotted">
                <option value="">--</option>
                {supplierName.map((supplier, idx) => (
                  <option key={idx} value={supplier}>{supplier}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center mt-4">
              <label className="w-40 text-right text-sm font-semibold text-gray-700">Varient <span className="text-red-500">*</span></label>
              <select className="ml-4 flex-1 w-[300px] border border-gray-400 rounded px-2 py-1 focus:outline-none focus:border-dotted appearance-none">
                <option value="">--</option>
                <option value="small">Small</option>
                <option value="Lerge">Lerge</option>
                <option value="Medium">Medium</option>
                <option value="Extra Lerge">Extra Lerge</option>
              </select>
            </div>
            <div className="flex items-center mt-4">
              <label className="w-40 text-right text-sm font-semibold text-gray-700">Default Varient <span className="text-red-500">*</span></label>
              <select className="ml-4 flex-1 w-[300px] border border-gray-400 rounded px-2 py-1 focus:outline-none focus:border-dotted appearance-none">
                <option value="">--</option>
              </select>
            </div>
            <div className="flex items-center mt-4">
              <label className="w-40 text-right text-sm font-semibold text-gray-700">Color</label>
              <select className="ml-4 flex-1 w-[300px] border border-gray-400 rounded px-2 py-1 text-left focus:outline-none appearance-none" defaultValue="">
                <option value="" disabled hidden></option>
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
              </select>
            </div>
            <div className="flex items-center mt-4">
              <fieldset className="flex items-center ml-4 gap-2">
                <input type="checkbox" className="checkbox h-4 w-4 text-blue-600" checked={showDiv} onChange={() => setShowDiv(!showDiv)} />
                <span className="text-gray-700 w-full truncate whitespace-nowrap overflow-hidden">Set Variant Wise Price</span>
              </fieldset>
              <div className={`ml-8 mt-3 p-4 border border-gray-300 rounded bg-gray-50 transition-all duration-300 w-[400px] ${showDiv ? "block opacity-100" : "opacity-0 h-0 overflow-hidden"}`}>
                <p className="text-gray-800"></p>
              </div>
            </div>
            <div className="flex items-center mt-4 mb-8">
              <label className="w-40 text-right text-sm font-semibold text-gray-700">Video Link <span className="text-red-500">*</span></label>
              <input type="url" className="ml-4 flex-1 w-[300px] border border-gray-400 rounded px-2 py-1 focus:outline-none focus:border-dotted" />
            </div>
          </div>
        )}

        {/* IMAGE TAB */}
        {activeTab === "image" && (
          <div className="space-y-6">
            <div>
              <div className="flex gap-4 items-center">
                <label className=" font-semibold mb-1 text-right text-gray-700">Default image</label>
                <input type="file" className="block file-input text-sm text-gray-900 border" onChange={handleDefaultUpload} />
              </div>
              {uploadedUrls.default && (
                <p className="text-sm text-gray-600 mt-1">
                  Uploaded: <a href={uploadedUrls.default} className="text-blue-500 underline" target="_blank" rel="noreferrer">
                    <img className="" src={uploadedUrls.default} alt="" />
                  </a>
                </p>
              )}
            </div>
            <div className="mb-4">
              <div className="flex flex-col gap-4 mx-8">
                {images.map((_, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <label className="w-16 font-medium">Image {index + 1}</label>
                    <input type="file" className="file-input text-sm text-gray-900" onChange={(e) => handleDynamicUpload(e, index)} />
                    <button type="button" className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-1 px-3 rounded" onClick={addImageInput}>+</button>
                    <button type="button" className={`bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded ${images.length === 1 ? "opacity-50 cursor-not-allowed" : ""}`} onClick={() => removeImageInput(index)} disabled={images.length === 1}>−</button>
                    {uploadedUrls[index] && <img src={uploadedUrls[index]} alt={`Uploaded ${index}`} className="h-16 w-16 object-cover rounded" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TRANSLATION TAB */}
        {activeTab === "translation" && <div></div>}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-6">
          <div className="space-x-2">
            <button type="button" onClick={goFirst} disabled={isFirstTab} className={`px-4 py-2 border rounded-md ${isFirstTab ? "text-gray-400 cursor-not-allowed" : "text-gray-600"}`}>First</button>
            <button type="button" onClick={goPrev} disabled={isFirstTab} className={`px-4 py-2 border rounded-md ${isFirstTab ? "text-gray-400 cursor-not-allowed" : "text-gray-600"}`}>Previous</button>
          </div>
          <div className="space-x-2">
            <button type="button" onClick={goNext} disabled={isLastTab} className={`px-4 py-2 border rounded-md ${isLastTab ? "text-gray-400 cursor-not-allowed" : "text-green-600"}`}>Next</button>
            <button type="button" onClick={goLast} disabled={isLastTab} className={`px-4 py-2 border rounded-md ${isLastTab ? "text-gray-400 cursor-not-allowed" : "text-green-600"}`}>Last</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
