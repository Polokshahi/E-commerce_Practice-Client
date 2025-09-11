import { Link } from "react-router";

const GadgetAndGearCart = ({ gadgetProducts }) => {
  if (!gadgetProducts || gadgetProducts.length === 0) return null;

  const featured = gadgetProducts[0];
  const topRight = gadgetProducts[1];
  const bottomRight = gadgetProducts.slice(2, 4);

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-3">
        <h1 className="text-xl font-extrabold">Gadget & Gear</h1>
        <input
          type="text"
          placeholder="Search"
          className="border p-2 rounded w-full md:w-64"
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row justify-between mt-5 gap-5">
        {/* Left Big Featured Product */}
        {featured && (
          <Link
            to={`/product/${featured._id}`}
            className="flex-1 bg-white rounded shadow p-4 transform transition duration-300 hover:shadow-lg hover:scale-105"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center h-full">
              <div className="w-full md:w-1/2 h-64 flex items-center justify-center overflow-hidden rounded">
                <img
                  src={featured.image || "https://i.ibb.co.com/Z1XJtrbF/istockphoto-1396814518-612x612.jpg"}
                  alt={featured.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://i.ibb.co.com/Z1XJtrbF/istockphoto-1396814518-612x612.jpg";
                  }}
                />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">{featured.category}</p>
                <h2 className="text-lg font-bold mb-2">{featured.title}</h2>
                <p className="text-gray-700 mb-2">
                  {featured.description?.slice(0, 100)}...
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold text-green-600">
                    ${featured.price}
                  </span>
                  {featured.discount && (
                    <span className="bg-green-100 text-green-600 px-2 py-1 text-xs rounded-full">
                      {featured.discount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Right Section */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Top Box */}
          {topRight && (
            <Link
              to={`/product/${topRight._id}`}
              className="bg-white rounded shadow p-4 h-48 flex items-center transform transition duration-300 hover:shadow-lg hover:scale-105"
            >
              <div className="flex items-center gap-4 w-full">
                <div className="h-full w-32 flex-shrink-0 overflow-hidden rounded">
                  <img
                    src={topRight.image || "https://i.ibb.co.com/Z1XJtrbF/istockphoto-1396814518-612x612.jpg"}
                    alt={topRight.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{topRight.title}</h3>
                  <p className="text-sm text-gray-500">{topRight.category}</p>
                  <p className="text-green-600 font-bold">${topRight.price}</p>
                </div>
              </div>
            </Link>
          )}

          {/* Bottom Two Boxes */}
          <div className="flex flex-col sm:flex-row gap-4">
            {bottomRight?.map((product, index) => (
              <Link
                key={product._id || index}
                to={`/product/${product._id}`}
                className="bg-white flex-1 rounded shadow p-4 flex items-center gap-4 h-48 transform transition duration-300 hover:shadow-lg hover:scale-105"
              >
                <div className="h-full w-32 flex-shrink-0 overflow-hidden rounded">
                  <img
                    src={product.image || "https://i.ibb.co.com/Z1XJtrbF/istockphoto-1396814518-612x612.jpg"}
                    alt={product.title}
                    className="w-full h-full object-cover"
                    onError={(e) =>
                      (e.currentTarget.src =
                        "https://i.ibb.co.com/Z1XJtrbF/istockphoto-1396814518-612x612.jpg")
                    }
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{product.title}</h3>
                  <p className="text-sm text-gray-500">{product.category}</p>
                  <p className="text-green-600 font-bold">${product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GadgetAndGearCart;
