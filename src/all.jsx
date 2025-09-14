import { Link } from "react-router";

const ElectronicProductCart = ({ electronicProduct }) => {
  const { productName, price, _id, image } = electronicProduct;

  return (
    <div className="border rounded-lg shadow hover:shadow-md transition p-4">
      <Link to={`/product/${_id}`}>
        <div>
          <div className="flex justify-center">
            <img
              src={image || "https://i.ibb.co/Z1XJtrbF/istockphoto-1396814518-612x612.jpg"}
              alt={productName || "Product"}
              className="h-40 object-contain"
              onError={(e) => {
                e.currentTarget.src =
                  "https://i.ibb.co/Z1XJtrbF/istockphoto-1396814518-612x612.jpg";
              }}
            />
          </div>
          <div className="text-center mt-4">
            <p className="text-lg font-bold text-gray-800">
              ${price?.toFixed(2)}{" "}
              <span className="text-sm font-normal">/ Unit</span>
            </p>
            <p className="text-sm text-gray-500 mt-1">{productName}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ElectronicProductCart;




import { useState, useEffect } from "react";
import ElectronicProductCart from "./ElectronicProductCart";
import axiosInstantce from "../../Hook/useAxios";

const Electronics = () => {
  const [electronicsProducts, setElectronicsProducts] = useState([]);

  useEffect(() => {
    // Fetch electronics products from server
    axiosInstantce.get('/electronics')
      .then((res) => {
        setElectronicsProducts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching electronics:", err);
      });
  }, []); 

  return (
    <div className="max-w-7xl m-auto mt-2">
      <div className="flex justify-between items-center">
        <h1 className="text-black font-extrabold text-2xl">Electronics</h1>
        <input className="border-1 p-2 rounded" type="text" placeholder="search" />
      </div>

      {/* Electronics products from server */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-4">
        {electronicsProducts?.map((electronicProduct) => (
          <ElectronicProductCart
            key={electronicProduct._id} // always add a unique key
            electronicProduct={electronicProduct}
          />
        ))}
      </div>
    </div>
  );
};

export default Electronics;
