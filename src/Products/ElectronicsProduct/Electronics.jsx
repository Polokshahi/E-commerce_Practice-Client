import { useState, useEffect } from "react";
import ElectronicProductCart from "./ElectronicProductCart";
import axiosInstance from "../../Hook/useAxios";

const Electronics = () => {
  const [electronicsProducts, setElectronicsProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    axiosInstance
      .get("/electronics")
      .then((res) => setElectronicsProducts(res.data))
      .catch((err) => console.error("Error fetching electronics:", err));
  }, []);

  const displayedProducts = showAll ? electronicsProducts : electronicsProducts.slice(0, 12);

  return (
    <div className="max-w-7xl m-auto mt-2">
      <div className="flex justify-between items-center">
        <h1 className="text-black font-extrabold text-2xl">Electronics</h1>
        <input
          className="border p-2 rounded w-48"
          type="text"
          placeholder="Search"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-4">
        {displayedProducts.map((electronicProduct) => (
          <ElectronicProductCart
            key={electronicProduct._id}
            electronicProduct={electronicProduct}
          />
        ))}
      </div>

      {!showAll && electronicsProducts.length > 12 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowAll(true)}
            className="bg-green-600 text-white px-5 py-2 rounded-full shadow hover:bg-green-700 transition"
          >
            View All
          </button>
        </div>
      )}
    </div>
  );
};

export default Electronics;
