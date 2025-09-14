import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const ElectronicCardDetails = () => {
    const [detailDatas, setDetailDatas] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        axios.get('http://localhost:5000/electronics')
            .then(res => setDetailDatas(res.data))
            .catch(err => console.error(err));
    }, []);

    const singleData = detailDatas.find(data => data._id === id);

    if (!singleData) return <p className="text-center mt-20 text-gray-600">Loading...</p>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
            <div className="flex flex-col md:flex-row gap-8 bg-white shadow-xl rounded-lg overflow-hidden max-w-6xl w-full">
                
                {/* Product Image */}
                <div className="md:w-1/2 flex justify-center items-center p-4 bg-gray-100">
                    <img
                        src={singleData.image}
                        alt={singleData.productName}
                        onError={(e) => { e.currentTarget.src = 'https://i.ibb.co/Z1XJtrbF/istockphoto-1396814518-612x612.jpg'; }}
                        className="object-contain max-h-96"
                    />
                </div>

                {/* Product Details */}
                <div className="md:w-1/2 p-6 flex flex-col justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">{singleData.productName}</h1>
                        <p className="text-xl text-green-600 font-semibold mt-2">${singleData.price}</p>
                        <p className="text-gray-700 mt-2"><span className="font-semibold">Brand:</span> {singleData.brand}</p>
                        <p className="text-gray-700"><span className="font-semibold">Category:</span> {singleData.category}</p>
                        <p className="text-gray-700"><span className="font-semibold">Item Code:</span> {singleData.itemCode}</p>
                        <p className={`font-semibold mt-2 ${singleData.status === 'In Stock' ? 'text-green-600' : 'text-red-600'}`}>
                            Status: {singleData.status}
                        </p>
                        <a
                            href={singleData.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline mt-2 inline-block"
                        >
                            Visit Website
                        </a>
                    </div>

                    <button
                        className={`mt-6 py-3 rounded-lg font-semibold transition ${
                            singleData.status === 'In Stock'
                                ? 'bg-green-600 cursor-pointer text-white hover:bg-green-700'
                                : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                        }`}
                        disabled={singleData.status !== 'In Stock'}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ElectronicCardDetails;
