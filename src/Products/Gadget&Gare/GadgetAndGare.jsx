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

      {/* Bottom Footer Section */}
      <footer className="bg-white border-t mt-8">
        <div className="max-w-7xl m-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} Gadget & Gear. All rights reserved.</p>
          <div className="flex gap-4 mt-3 md:mt-0">
            <a href="#" className="hover:text-green-600 transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-green-600 transition">
              Terms of Service
            </a>
            <a href="#" className="hover:text-green-600 transition">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GadgetAndGare;
