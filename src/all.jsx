import { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaEye, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { useNavigate } from "react-router";

const ManageProduct = () => {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [sortOrder, setSortOrder] = useState(null); // 'asc' or 'desc'
    const perPage = 10;
    const navigate = useNavigate();
    const [supplierSortOrder, setSupplierSortOrder] = useState(null); // 'asc' or 'desc'

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
    // Price sort handler
    const handleSortPrice = () => {
        let sortedProducts = [...products];
        if (sortOrder === "asc") {
            // Next: High → Low
            sortedProducts.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
            setSortOrder("desc");
        } else {
            // Default + Next: Low → High
            sortedProducts.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
            setSortOrder("asc");
        }
        setProducts(sortedProducts);
    };

    // Supplier Price sort handler
    const handleSupplierPriceSort = () => {
        let sortedProducts = [...products];
        if (supplierSortOrder === "asc") {
            // Next: High → Low
            sortedProducts.sort((a, b) => (b.supplierPrice ?? 0) - (a.supplierPrice ?? 0));
            setSupplierSortOrder("desc");
        } else {
            // Default + Next: Low → High
            sortedProducts.sort((a, b) => (a.supplierPrice ?? 0) - (b.supplierPrice ?? 0));
            setSupplierSortOrder("asc");
        }
        setProducts(sortedProducts);
    };


    const handleDeleteProduct = (id) =>{

        axios.delete(`http://localhost:5000/allProducts/${id}`)
        .then(res =>{
            console.log(res.data);
            alert("Product deleted successfully");
        }).catch(err => console.log(err.message)
       
    
    
    ); alert("Failed to delete product");


        console.log(id);
    }













    // edit product
    const handleEditProduct = (id) => {
        navigate(`/editeProduct/${id}`);
        console.log(id);
    };

    return (
        <div className="p-2 sm:p-4 md:p-6 bg-gray-100 min-h-screen -mt-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-6 text-gray-800">
                Manage Product
            </h2>

            <div className="overflow-x-auto bg-white shadow-md rounded-xl">
                <table className="w-full text-xs sm:text-sm text-left">
                    <thead className="bg-gray-200 text-gray-700 uppercase text-[10px] sm:text-xs">
                        <tr>
                            <th className="px-2 sm:px-3 py-2">SL</th>
                            <th className="px-2 sm:px-3 py-2">Product ID</th>
                            <th className="px-2 sm:px-3 py-2">Product</th>
                            <th className="px-2 sm:px-3 py-2">Supplier</th>
                            <th className="px-2 sm:px-3 py-2">Category</th>
                            <th
                                className="px-2 sm:px-3 py-2 cursor-pointer flex items-center"
                                onClick={handleSortPrice}
                            >
                                Sell Price
                                {sortOrder === "asc" && <FaSortUp className="ml-1" />}
                                {sortOrder === "desc" && <FaSortDown className="ml-1" />}
                                {!sortOrder && <FaSort className="ml-1" />}
                            </th>

                            <th
                                className="px-2 sm:px-3 py-2 cursor-pointer"
                                onClick={handleSupplierPriceSort}
                            >
                                <div className="flex items-center space-x-1">
                                    <span>Supplier Price</span>
                                    <div className="flex flex-col leading-none">
                                        <FaSortUp className="mt-1" />
                                        <FaSortDown className="-mt-3" />
                                    </div>
                                </div>
                            </th>

                            <th className="px-2 sm:px-3 py-2">Offer Price</th>
                            <th className="px-2 sm:px-3 py-2">Images</th>
                            <th className="px-2 sm:px-3 py-2 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {products.map((product, index) => (
                            <tr
                                key={product._id || index}
                                className="border-t hover:bg-gray-50"
                            >
                                <td className="px-2 sm:px-3 py-2">
                                    {(page - 1) * perPage + index + 1}
                                </td>
                                <td className="px-2 sm:px-3 py-2">
                                    {product.productId || "N/A"}
                                </td>
                                <td className="px-2 sm:px-3 py-2 max-w-[120px] sm:max-w-[250px] truncate">
                                    {product.title || product.productName}
                                </td>
                                <td className="px-2 sm:px-3 py-2 text-center">
                                    {product.supplierName || "N/A"}
                                </td>
                                <td className="px-2 sm:px-3 py-2">
                                    {product.category || "N/A"}
                                </td>
                                <td className="px-2 sm:px-3 py-2 font-semibold text-green-700">
                                    ${product.price?.toLocaleString()}
                                </td>
                                <td className="px-2 sm:px-3 py-2 text-blue-600">
                                    ${product.supplierPrice?.toLocaleString() || 0}
                                </td>
                                <td className="px-2 sm:px-3 py-2 text-purple-600">
                                    ${product.offerPrice?.toLocaleString() || "0"}
                                </td>
                                <td className="px-2 sm:px-3 py-2">
                                    <img
                                        src={product.image}
                                        onError={(e) =>
                                        (e.currentTarget.src =
                                            "https://i.ibb.co/Z1XJtrbF/istockphoto-1396814518-612x612.jpg")
                                        }
                                        alt="product"
                                        className="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded shadow"
                                    />
                                </td>
                                <td className="px-2 sm:px-3 py-2 flex justify-center space-x-1 text-[10px] sm:text-xs">
                                    <button
                                        onClick={() => handleViewProductDetails(product._id)}
                                        className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded flex items-center space-x-1"
                                    >
                                        <FaEye />
                                    </button>

                                    <button
                                        onClick={() => handleEditProduct(product._id)}
                                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded flex items-center space-x-1"
                                    >
                                        <FaEdit />
                                    </button>

                                    <button onClick={() =>handleDeleteProduct(product._id)} className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded flex items-center space-x-1">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-wrap justify-center mt-4 sm:mt-6 gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        className={`px-2 sm:px-3 py-1 rounded border text-xs sm:text-sm font-medium ${page === i + 1
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





require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Basic route
app.get("/", (req, res) => {
    res.send("Hello, Express server is running!");
});

// MongoDB connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fpvzj8u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
    serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
});

const database = client.db("E-commerce");
const electronicsProducts = database.collection("electronicsProduct");
const womenFashion = database.collection("WomenFashion");
const winterFashion = database.collection("WinterFashion");
const gadgetAndGare = database.collection("Gadgate&Gear");
const usersCollection = database.collection("users");

async function run() {
    try {
        await client.connect();

        // Electronics products
        app.get("/electronics", async (req, res) => {
            const result = await electronicsProducts.find().toArray();
            res.send(result);
        });

        // Women fashion
        app.get("/womenFashion", async (req, res) => {
            const result = await womenFashion.find().toArray();
            res.send(result);
        });

        // Winter fashion
        app.get("/winterFashion", async (req, res) => {
            const result = await winterFashion.find().toArray();
            res.send(result);
        });

        // Gadget & Gear
        app.get("/gadgetProduct", async (req, res) => {
            const result = await gadgetAndGare.find().toArray();
            res.send(result);
        });

        // Show all users
        app.get("/users", async (req, res) => {
            const result = await usersCollection.find().toArray();
            res.send(result);
        });

        // Store a new user
        app.post("/users", async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.send(result);
        });

        // Get a single user by email
        app.get("/users/:email", async (req, res) => {
            const email = req.params.email?.trim().toLowerCase();
            const user = await usersCollection.findOne({ email });
            if (!user) return res.status(404).json({ message: "User not found" });
            res.send(user);
        });


        // all product for sort filter and other action

        app.get('/allProducts1', async (req, res) => {
            try {
                const allProduct = await electronicsProducts.aggregate([
                    // Electronics
                    {
                        $addFields: {
                            category: { $ifNull: ["$category", "Electronics"] }
                        }
                    },
                    // WomenFashion
                    {
                        $unionWith: {
                            coll: "WomenFashion",
                            pipeline: [
                                {
                                    $addFields: {
                                        category: { $ifNull: ["$category", "WomenFashion"] }
                                    }
                                }
                            ]
                        }
                    },
                    // WinterFashion
                    {
                        $unionWith: {
                            coll: "WinterFashion",
                            pipeline: [
                                {
                                    $addFields: {
                                        category: { $ifNull: ["$category", "WinterFashion"] }
                                    }
                                }
                            ]
                        }
                    },
                    // Gadgate&Gear
                    {
                        $unionWith: {
                            coll: "Gadgate&Gear",
                            pipeline: [
                                {
                                    $addFields: {
                                        category: { $ifNull: ["$category", "Gadgate&Gear"] }
                                    }
                                }
                            ]
                        }
                    }
                ]).toArray();

                res.send(allProduct);
            } catch (err) {
                console.error("Error fetching products:", err);
                res.status(500).json({ message: "Error fetching products" });
            }
        });




























        // all product use aggregate 

        // server.js
        app.get("/allProducts", async (req, res) => {
            try {
                const page = parseInt(req.query.page) || 1;
                const perPage = 10;
                const skip = (page - 1) * perPage;

                // products with pagination
                const products = await electronicsProducts.aggregate([
                    // Electronics
                    { $addFields: { category: { $ifNull: ["$category", "Electronics"] } } },
                    // WomenFashion
                    {
                        $unionWith: {
                            coll: "WomenFashion",
                            pipeline: [
                                { $addFields: { category: { $ifNull: ["$category", "WomenFashion"] } } }
                            ]
                        }
                    },
                    // WinterFashion
                    {
                        $unionWith: {
                            coll: "WinterFashion",
                            pipeline: [
                                { $addFields: { category: { $ifNull: ["$category", "WinterFashion"] } } }
                            ]
                        }
                    },
                    // Gadgate&Gear
                    {
                        $unionWith: {
                            coll: "Gadgate&Gear",
                            pipeline: [
                                { $addFields: { category: { $ifNull: ["$category", "Gadgate&Gear"] } } }
                            ]
                        }
                    }
                ])
                    .skip(skip)
                    .limit(perPage)
                    .toArray();

                // total count (without skip/limit)
                const totalCount = await electronicsProducts.aggregate([
                    { $addFields: { category: { $ifNull: ["$category", "Electronics"] } } },
                    {
                        $unionWith: {
                            coll: "WomenFashion",
                            pipeline: [
                                { $addFields: { category: { $ifNull: ["$category", "WomenFashion"] } } }
                            ]
                        }
                    },
                    {
                        $unionWith: {
                            coll: "WinterFashion",
                            pipeline: [
                                { $addFields: { category: { $ifNull: ["$category", "WinterFashion"] } } }
                            ]
                        }
                    },
                    {
                        $unionWith: {
                            coll: "Gadgate&Gear",
                            pipeline: [
                                { $addFields: { category: { $ifNull: ["$category", "Gadgate&Gear"] } } }
                            ]
                        }
                    }
                ]).toArray();

                res.json({ products, total: totalCount.length });
            } catch (err) {
                console.error("Error fetching all products:", err);
                res.status(500).json({ message: "Failed to fetch products" });
            }
        });














        // Update product route
        app.put("/updateProduct/:id", async (req, res) => {
            const { id } = req.params;
            const updatedData = req.body; // form data from client
            console.log(updatedData);

            // Collections to check
            const collections = [
                electronicsProducts,
                womenFashion,
                winterFashion,
                gadgetAndGare
            ];

            try {
                let updated = false;

                for (let col of collections) {
                    const filter = { _id: new ObjectId(id) };   // Find by _id
                    const updateDoc = { $set: updatedData };    // Set all fields from form
                    const options = { upsert: false };         // Only update, no insert

                    const result = await col.updateOne(filter, updateDoc, options);

                    console.log(
                        `${result.matchedCount} document(s) matched, updated ${result.modifiedCount} document(s)`
                    );

                    if (result.matchedCount > 0) {
                        updated = true;
                        break; // Stop once updated
                    }
                }

                if (!updated) {
                    return res.status(404).json({ message: "Product not found" });
                }

                res.json({ message: "Product updated successfully" });
            } catch (err) {
                console.error("Update failed:", err);
                res.status(500).json({ message: "Update failed", error: err.message });
            }
        });


        // delete product
        app.delete("/allProducts/:id", async (req, res) => {
            try {
                const { id } = req.params;
                console.log("Deleting product with id:", id);

                const query = { _id: new ObjectId(id) };
                const result = await productsCollection.deleteOne(query);

                if (result.deletedCount > 0) {
                    res.json({ success: true, message: "Product deleted successfully" });
                } else {
                    res.json({ success: false, message: "No product found with this id" });
                }
            } catch (error) {
                console.error(error);
                res.status(500).json({ success: false, error: error.message });
            }
        });






















        // Ping MongoDB
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. Successfully connected to MongoDB!");
    } finally {
        // Keep server running
    }

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

run().catch(console.dir);

