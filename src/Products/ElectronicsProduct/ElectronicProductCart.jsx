import { Link } from "react-router";

const ElectronicProductCart = ({ electronicProduct }) => {
  const { productName, price, image, _id } = electronicProduct;

  return (
    <div className="border rounded-lg shadow hover:shadow-md transition p-4">
      <Link to={`/product/${_id}`}>
        <div>
          <div className="flex justify-center">
            <img
              src={image}
              alt={productName}
              className="h-40 object-contain"
            />
          </div>
          <div className="text-center mt-4">
            <p className="text-lg font-bold text-gray-800">
              ${price.toFixed(2)} <span className="text-sm font-normal">/ Unit</span>
            </p>
            <p className="text-sm text-gray-500 mt-1">{productName}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ElectronicProductCart;
