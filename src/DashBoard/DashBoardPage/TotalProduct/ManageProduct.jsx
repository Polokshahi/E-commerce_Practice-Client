import { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaEye, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { BsFillCartFill } from "react-icons/bs";
import { useNavigate } from "react-router";

const ManageProduct = () => {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [sortOrder, setSortOrder] = useState(null); // 'asc' or 'desc'
    const perPage = 10;
    const navigate = useNavigate();

    const fetchProducts = async (page) => {
        try {
            const res = await axios.get(`http://localhost:5000/allProducts?page=${page}`);
            setProducts(res.data.products || res.data); 
            setTotal(res.data.total || res.data.length);
        } catch (err) {
            console.error("Failed to fetch products:", err);
        }
    };

    useEffect(() => {
        fetchProducts(page);
    }, [page]);

    const totalPages = Math.ceil(total / perPage);

    const handleViewProductDetails = (productId) => {
        navigate(`/view-product/${productId}`);
    };

    // Price sort handler
    const handleSortPrice = () => {
        let sortedProducts = [...products];
        if (sortOrder === "asc") {
            sortedProducts.sort((a, b) => b.price - a.price); // High to Low
            setSortOrder("desc");
        } else {
            sortedProducts.sort((a, b) => a.price - b.price); // Low to High
            setSortOrder("asc");
        }
        setProducts(sortedProducts);
    };



    // edit product

    const handleEditProduct = (id) =>{
        navigate(`/editeProduct/${id}`)
        console.log(id);
    }





    return (
        <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
            <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-800">Manage Product</h2>

            <div className="overflow-auto bg-white shadow-md rounded-xl">
                <table className="min-w-[1000px] w-full text-sm text-left">
                    <thead className="bg-gray-200 text-gray-700 uppercase text-xs">
                        <tr>
                            <th className="px-3 py-2">SL</th>
                            <th className="px-3 py-2">Product ID</th>
                            <th className="px-3 py-2">Product</th>
                            <th className="px-3 py-2">Supplier</th>
                            <th className="px-3 py-2">Category</th>
                            <th className="px-3 py-2 cursor-pointer flex items-center" onClick={handleSortPrice}>
                                Sell Price
                                {sortOrder === "asc" && <FaSortUp className="ml-1" />}
                                {sortOrder === "desc" && <FaSortDown className="ml-1" />}
                                {!sortOrder && <FaSort className="ml-1" />}
                            </th>
                            <th className="px-3 py-2">Supplier Price</th>
                            <th className="px-3 py-2">Offer Price</th>
                            <th className="px-3 py-2">Images</th>
                            <th className="px-3 py-2 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {products.map((product, index) => (
                            <tr key={product._id || index} className="border-t hover:bg-gray-50">
                                <td className="px-3 py-2">{(page - 1) * perPage + index + 1}</td>
                                <td className="px-3 py-2">{product.productId || "N/A"}</td>
                                <td className="px-3 py-2">
                                    <div className="w-64 truncate" title={product.title || product.productName}>
                                        {product.title || product.productName}
                                    </div>
                                </td>
                                <td className="px-3 py-2 text-center">
                                    <BsFillCartFill className="text-green-600 mx-auto" />
                                </td>
                                <td className="px-3 py-2">{product.category || "N/A"}</td>
                                <td className="px-3 py-2 font-semibold text-green-700">${product.price?.toLocaleString()}</td>
                                <td className="px-3 py-2 text-blue-600">${product.supplierPrice?.toLocaleString() || "N/A"}</td>
                                <td className="px-3 py-2 text-purple-600">${product.offerPrice?.toLocaleString() || "-"}</td>
                                <td className="px-3 py-2">
                                    <img
                                        src={product.image}
                                        onError={(e) => e.currentTarget.src = "https://i.ibb.co/Z1XJtrbF/istockphoto-1396814518-612x612.jpg"}
                                        alt="product"
                                        className="w-10 h-10 object-cover rounded shadow"
                                    />
                                </td>
                                <td className="px-3 py-2 flex justify-center space-x-1 text-xs">
                                    <button onClick={() => handleViewProductDetails(product._id)} className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded flex items-center space-x-1">
                                        <FaEye />
                                    </button>



                                    <button onClick={() => handleEditProduct(product._id)} className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded flex items-center space-x-1">
                                        <FaEdit />
                                    </button>



                                    <button className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded flex items-center space-x-1">
                                        <FaTrash />
                                    </button>




                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6 space-x-2">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        className={`px-3 py-1 rounded border text-sm font-medium ${page === i + 1
                            ? "bg-teal-600 text-white border-teal-600"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-200"
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

export default ManageProduct;
