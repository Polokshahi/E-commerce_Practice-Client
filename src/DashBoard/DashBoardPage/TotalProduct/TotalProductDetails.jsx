import { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const TotalProductDetails = () => {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const perPage = 10;

    const fetchProducts = async (page) => {
        try {
            const res = await axios.get(`http://localhost:5000/allProducts?page=${page}`);
            setProducts(res.data.products || res.data); // fallback if backend no pagination
            setTotal(res.data.total || res.data.length);
        } catch (err) {
            console.error("Failed to fetch products:", err);
        }
    };

    useEffect(() => {
        fetchProducts(page);
    }, [page]);

    const totalPages = Math.ceil(total / perPage);

    const names = products.map(p => p.title || p.productName);
    console.log(names);


    return (
        <div className="p-6 bg-gray-50 min-h-screen -mt-8">
            <h1 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-800">All Products</h1>

            <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-3 text-left font-medium text-gray-700 uppercase tracking-wider">Image</th>
                            <th className="py-2 px-3 text-left font-medium text-gray-700 uppercase tracking-wider">Product</th>
                            <th className="py-2 px-3 text-left font-medium text-gray-700 uppercase tracking-wider">Brand</th>
                            <th className="py-2 px-3 text-left font-medium text-gray-700 uppercase tracking-wider">Category</th>
                            <th className="py-2 px-3 text-left font-medium text-gray-700 uppercase tracking-wider">Price</th>
                            <th className="py-2 px-3 text-left font-medium text-gray-700 uppercase tracking-wider">Status</th>
                            <th className="py-2 px-3 text-center font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {products.map((p) => (
                            <tr key={p._id} className="hover:bg-gray-50 transition-colors duration-150">
                                <td className="py-2 px-3">
                                    <img
                                        src={p.image}
                                        onError={(e) => e.currentTarget.src = "https://i.ibb.co/Z1XJtrbF/istockphoto-1396814518-612x612.jpg"}
                                        alt={p.productName || p.title}
                                        className="w-12 h-12 object-cover rounded shadow-sm"
                                    />
                                </td>
                                <td className="py-2 px-3 text-gray-800 font-medium" title={p.title || p.productName}>
                                    {
                                        p.productName?.slice(0, 7)}{p.productName?.length > 7 ? "..." : ""







                                    }

                                    {
                                        p.title?.slice(0, 7)}{p.title?.length > 7 ? "..." : ""
                                    }
                                </td>
                                <td className="py-2 px-3 text-gray-600">{p.brand ? p.brand : 'Non-Brand'}</td>
                                <td className="py-2 px-3 text-gray-600">{p.category}</td>
                                <td className="py-2 px-3 text-gray-800 font-semibold">${p.price.toFixed(2)}</td>

                                <td className="py-2 px-3">
                                    {p.status ? (
                                        <span
                                            className={`px-2 py-1 rounded-full text-white text-xs font-medium ${p.status === "In Stock" ? "bg-green-500" : "bg-red-500"
                                                }`}
                                        >
                                            {p.status}
                                        </span>
                                    ) : (
                                        <span
                                            className={`px-2 py-1 rounded-full text-white text-xs font-medium ${p.in_stock === "true" ? "bg-green-500" : "bg-red-500"
                                                }`}
                                        >
                                            {p.in_stock === "true" ? "In Stock" : "Out of Stock"}
                                        </span>
                                    )}
                                </td>


                                <td className="py-2 px-3 flex justify-center space-x-2">
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md text-xs flex items-center space-x-1">
                                        <FaEdit /> <span>Edit</span>
                                    </button>
                                    <button className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md text-xs flex items-center space-x-1">
                                        <FaTrash /> <span>Delete</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-4 space-x-2">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        className={`px-3 py-1 rounded-lg border text-sm font-medium transition-colors duration-150 ${page === i + 1
                            ? "bg-teal-500 text-white border-teal-500"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                            }`}
                        onClick={() => setPage(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TotalProductDetails;
