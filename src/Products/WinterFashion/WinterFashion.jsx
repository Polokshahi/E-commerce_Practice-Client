import { useEffect, useState } from "react";
import axiosInstantce from "../../Hook/useAxios";
import WinterFashionCart from "./WinterFashionCart";

const WinterFashion = () => {
    const [winterProducts, setWinterProducts] = useState([]);

    useEffect(() =>{
        axiosInstantce.get('/winterFashion')
        .then((res) =>{
            setWinterProducts(res.data);
        })
        .catch((err) =>{
            console.log(err)
        })

    },[])

    return (
        <div className="max-w-7xl m-auto mt-4">

            <div>
                <h1 className="font-extrabold text-2xl">Winter Collection</h1>
                <input type="text" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-2">

                {

                    winterProducts.map(winterProduct => <WinterFashionCart winterProduct={winterProduct} key={winterProduct._id}></WinterFashionCart>)

                }

            </div>
            
        </div>
    );
};

export default WinterFashion;