import { useParams, useNavigate } from "react-router";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const EditedProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [fileSelected, setFileSelected] = useState(false);

  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    price: "",
    supplierPrice: "",
    offerPrice: "",
    description: "",
    image: "",
    supplierName: "",
  });

  const categories = [
    "Mobiles & Tablets",
    "Laptops & Computers",
    "Computer Accessories",
    "Cameras & Photography",
    "TVs & Home Appliances",
    "Smart Watches & Wearables",
    "Gaming Consoles & Accessories",
    "Men's Clothing",
    "Women's Clothing",
    "Kid's Fashion",
    "Shoes",
    "Bags & Luggage",
    "Watches",
    "Jewelry & Accessories",
    "Beauty & Personal Care",
    "Makeup",
    "Skincare",
    "Hair Care",
    "Health & Wellness",
    "Medicines & Supplements",
    "Furniture",
    "Home Decor",
    "Kitchen & Dining",
    "Bedding",
    "Cleaning & Household",
    "Tools & Hardware",
    "Fruits & Vegetables",
    "Meat & Fish",
    "Dairy & Bakery",
    "Beverages",
    "Snacks",
    "Cooking Essentials",
    "Baby Clothing",
    "Baby Food & Formula",
    "Diapers & Baby Care",
    "Toys & Games",
    "School Supplies",
    "Sportswear",
    "Fitness Equipment",
    "Outdoor Gear",
    "Bicycles & Accessories",
    "Car Accessories",
    "Motorbike Accessories",
    "Oils & Lubricants",
    "Books",
    "Notebooks & Office Supplies",
    "Art & Craft",
    "Pet Supplies",
    "Musical Instruments",
    "Gifts & Vouchers",
  ];

  // Fetch all products
  useEffect(() => {
    axios
      .get("http://localhost:3000/allProducts1")
      .then((res) => {
        setProducts(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      });
  }, [id]);

  const singleProduct = products.find((p) => p._id === id);

  // Populate form
  useEffect(() => {
    if (singleProduct) {
      setFormData({
        productName: singleProduct.productName || "",
        category: singleProduct.category || "",
        price: singleProduct.price || "",
        supplierPrice: singleProduct.supplierPrice || "",
        offerPrice: singleProduct.offerPrice || "",
        description: singleProduct.description || "",
        image: singleProduct.image || "",
        supplierName: singleProduct.supplierName || "",
      });
      if (singleProduct.image) setFileSelected(true);
    }
  }, [singleProduct]);

  if (loading)
    return <span className="loading loading-dots loading-xl mx-auto block mt-20"></span>;
  if (!singleProduct)
    return <p className="p-4 text-center text-red-500">Product not found</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", "Ecommerce");

    setUploading(true);
    setFileSelected(true);

    axios
      .post("https://api.cloudinary.com/v1_1/dhposuwdg/image/upload", form)
      .then((res) => {
        setFormData((prev) => ({ ...prev, image: res.data.secure_url }));
        setUploading(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Image uploaded successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        console.error("Image upload failed:", err);
        setUploading(false);
        alert("Image upload failed");
      });
  };

  const removeFile = () => {
    setFormData((prev) => ({ ...prev, image: "" }));
    setFileSelected(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting:", formData);

    axios
      .put(`http://localhost:3000/updateProduct/${id}`, formData)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(-1);
      })
      .catch((err) => {
        console.error("Update failed:", err);
        Swal.fire({
          icon: "error",
          title: "Update failed",
          text: err.response?.data?.error || "Something went wrong",
        });
      });
  };

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto bg-white rounded-lg shadow-lg mt-6 sm:-mt-3">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center sm:text-left">
        Edit Product
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-6">
        {/* Product Name */}
        <div>
          <label className="block text-gray-600 mb-1 font-medium">Product Name</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Category & Supplier Name */}
        <div className="flex flex-col md:flex-row lg:flex-row gap-4">
          {/* Category Dropdown */}
          <div className="flex-1">
            <label className="block text-gray-600 mb-1 font-medium">Category</label>
            <select
              name="category"
              value={formData.category || ""}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Supplier Name */}
          <div className="flex-1">
            <label className="block text-gray-600 mb-1 font-medium">Supplier Name</label>
            <input
              type="text"
              name="supplierName"
              value={formData.supplierName}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Prices */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-600 mb-1 font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1 font-medium">Supplier Price</label>
            <input
              type="number"
              name="supplierPrice"
              value={formData.supplierPrice}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1 font-medium">Offer Price</label>
            <input
              type="number"
              name="offerPrice"
              value={formData.offerPrice}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-600 mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            rows={4}
          />
        </div>

        {/* Image Upload */}
        <div className="form-control w-full -mt-3">
          <label className="label">
            <span className="label-text font-medium">Product Image</span>
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input file-input-bordered file-input-primary w-full"
          />
          {fileSelected && (
            <button
              type="button"
              onClick={removeFile}
              className="btn btn-sm btn-error mt-2"
            >
              Remove Image
            </button>
          )}
          {uploading && (
            <div className="flex justify-center items-center mt-2">
              <span className="loading loading-spinner loading-xl"></span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button type="submit" className="btn btn-success w-full sm:w-auto">
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn btn-error w-full sm:w-auto"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditedProduct;
