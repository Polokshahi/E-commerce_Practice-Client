import { useParams, useNavigate } from "react-router"; 
import { useEffect, useState } from "react";
import axios from "axios";

const ViewProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/allProducts1`) 
      .then((res) => {
        setProducts(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return <span className="loading loading-dots loading-xl mx-auto block mt-20"></span>;

  const singleProduct = products.find((product) => product._id === id);

  if (!singleProduct)
    return <p className="p-4 text-center text-red-500">Product not found</p>;

  const description =
    singleProduct.description ||
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt facilisis.";

  return (
    <div className="flex items-center justify-center bg-gray-100  p-4 sm:p-6 md:p-8 ">
      <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full flex flex-col md:flex-row overflow-hidden">

        {/* Product Image */}
        <div className="md:w-1/2 flex justify-center items-center bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 p-4 sm:p-6">
          <img
            src={singleProduct.image}
            alt={singleProduct.title || singleProduct.productName}
            className="w-full max-w-sm sm:max-w-md h-auto object-cover rounded-xl shadow-md transition-transform duration-500 hover:scale-105"
            onError={(e) =>
              (e.currentTarget.src =
                "https://i.ibb.co/Z1XJtrbF/istockphoto-1396814518-612x612.jpg")
            }
          />
        </div>

        {/* Product Info */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{singleProduct.title || singleProduct.productName}</h1>
          <p className="text-gray-500 text-sm sm:text-base"><strong>Category:</strong> {singleProduct.category || "N/A"}</p>

          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-xl sm:text-2xl font-bold text-green-700">${singleProduct.price?.toLocaleString() || "0"}</span>
            {singleProduct.offerPrice && (
              <span className="text-sm sm:text-lg text-red-500 line-through">${singleProduct.offerPrice?.toLocaleString()}</span>
            )}
          </div>

          <p className="text-gray-700 text-sm sm:text-base">{description}</p>

          <div className="mt-2 text-gray-500 text-xs sm:text-sm">
            <p><strong>Supplier Price:</strong> ${singleProduct.supplierPrice?.toLocaleString() || "N/A"}</p>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="mt-4 sm:mt-6 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-500 hover:from-pink-600 hover:to-indigo-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl w-36 sm:w-40 shadow-md sm:shadow-lg font-semibold text-sm sm:text-base"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
