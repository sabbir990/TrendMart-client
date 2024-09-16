import React from 'react';
import { Link } from 'react-router-dom';

const Product_card = ({product}) => {
  return (
    <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
      <img 
        className="w-full h-48 object-cover" 
        src={product?.featured_product?.image_url} 
        alt={product?.featured_product?.name}
      />
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{product?.featured_product?.name}</h2>
        <p className="text-gray-600 mb-4">{product?.subheadline}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">${product?.featured_product?.price}</span>
          <Link to={`/product-details/${product?._id}`} 
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product_card;
