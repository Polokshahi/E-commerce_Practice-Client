import { useEffect, useState } from "react";
import axiosInstantce from "../../Hook/useAxios";
import WinterFashionCart from "./WinterFashionCart";

const WinterFashion = () => {
    const [winterProducts, setWinterProducts] = useState([]);
    const [showAll, setShowAll] = useState(false);

    useEffect(() =>{
        axiosInstantce.get('/winterFashion')
        .then((res) =>{
            setWinterProducts(res.data);
        })
        .catch((err) =>{
            console.log(err)
        })

    },[])

    const displayProduct = showAll ? winterProducts : winterProducts.slice(0, 12);

    return (
        <div className="max-w-7xl m-auto mt-4">

            <div>
                <h1 className="font-extrabold text-2xl">Winter Collection</h1>
                <input type="text" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">

                {

                    displayProduct?.map(winterProduct => <WinterFashionCart winterProduct={winterProduct} key={winterProduct._id}></WinterFashionCart>)

                }

            </div>


            {!showAll && winterProducts.length > 12 && (


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

export default WinterFashion;