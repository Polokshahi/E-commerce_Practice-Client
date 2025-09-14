import { useEffect, useState } from "react";
import axiosInstance from "../../Hook/useAxios";
import GadgetAndGearCart from "./GadgetAndGareCart";

const GadgetAndGare = () => {
  const [gadgetProducts, setGadgetProducts] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/gadgetProduct")
      .then((res) => setGadgetProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="bg-[#f4f4f4] mt-3">
      <div className="max-w-7xl m-auto">
        {gadgetProducts.length > 0 && (
          <GadgetAndGearCart gadgetProducts={gadgetProducts} />
        )}
      </div>

    
      
    </div>
  );
};

export default GadgetAndGare;
