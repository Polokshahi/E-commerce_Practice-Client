import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const ElectronicCardDetails = () => {
  const [detailDatas, setDetailDatas] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:5000/electronics")
      .then((res) => setDetailDatas(res.data))
      .catch((err) => console.error(err));
  }, []);

  const singleData = detailDatas.find((data) => data._id === id);

  if (!singleData) {
    return (
      <p className="text-center mt-20 text-gray-600 text-lg">Loading...</p>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-6 px-3 overflow-hidden">
      <div className="bg-white rounded-2xl shadow-xl flex flex-col md:flex-row w-full max-w-5xl overflow-hidden border border-gray-200">
        
        {/* Image */}
        <div className="md:w-1/2 bg-gradient-to-br from-pink-100 via-yellow-100 to-purple-100 p-6 flex items-center justify-center">
          <img
            src={singleData.image}
            alt={singleData.productName}
            onError={(e) =>
              (e.currentTarget.src =
                "https://i.ibb.co/Z1XJtrbF/istockphoto-1396814518-612x612.jpg")
            }
            className="w-full max-h-96 object-contain rounded-lg"
          />
        </div>

        {/* Info */}
        <div className="md:w-1/2 p-8 flex flex-col justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              {singleData.productName}
            </h1>

            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Category:</span>{" "}
              {singleData.category || "N/A"}
            </p>

            <p className="text-xl font-bold text-green-600 mb-3">
              ${parseFloat(singleData.price).toFixed(2)}
            </p>

            <p className="text-gray-600 text-base leading-relaxed mb-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              euismod, nunc vel tincidunt facilisis.
            </p>

            <p className="text-sm text-gray-700">
              <span className="font-medium">Supplier Price:</span>{" "}
              <span className="text-gray-500">
                ${singleData.supplierPrice || "N/A"}
              </span>
            </p>
          </div>

          {/* Button */}
          <button
            className="mt-4 px-5 py-2.5 bg-gradient-to-r from-pink-500 to-indigo-500 text-white rounded-lg shadow-md hover:shadow-lg transition text-sm font-medium w-36"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ElectronicCardDetails;
