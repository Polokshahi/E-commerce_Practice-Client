
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
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-4">
        {electronicsProducts.map((electronicProduct) => (
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
