import { useNavigate } from "react-router-dom";
import { Heart, Star } from "lucide-react";

const ProductCard = ({product}) => {
    const navigate = useNavigate();
    return (
        <div
        key={product?._id}
        className="
          bg-white
          rounded-3xl
          overflow-hidden
          shadow-md
          hover:shadow-2xl
          transition-all
          duration-500
          hover:-translate-y-2
          group
          cursor-pointer
        "
        onClick={() => navigate(`/product/${product?.slug}?cat=${product?.category?._id}`)}
      >
        {/* Image */}
        <div className="relative overflow-hidden">
          <img
            src={product?.images?.[0]}
            alt={product?.title || ""}
            className="
              w-full
              h-[320px]
              object-cover
              transition-transform
              duration-700
              group-hover:scale-110
            "
          />

          {product?.discountPercent > 0 && (
            <div className="absolute top-4 left-4 bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              {product?.discountPercent}% OFF
            </div>
          )}

          <button
            className="
              absolute
              top-4
              right-4
              bg-white/90
              backdrop-blur-md
              p-2
              rounded-full
              shadow-md
              hover:bg-pink-500
              hover:text-white
              transition
            "
          >
            <Heart size={18} />
          </button>

          {/* {product.isTrending && (
            <span className="absolute bottom-4 left-4 bg-black text-white text-xs px-3 py-1 rounded-full">
              Trending
            </span>
          )} */}
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-xs text-gray-500 uppercase">
            {product?.category?.name}
          </p>

          <h3 className="font-semibold text-gray-800 mt-1 line-clamp-2 min-h-[48px]">
            {product?.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
            <Star
              size={14}
              fill="currentColor"
              className="text-yellow-500"
            />
            <span className="text-sm text-gray-600">
              {product?.rating}
            </span>

            <span className="text-xs text-gray-400">
              ({product?.ratingCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mt-3">
            <span className="text-pink-600 font-bold text-xl">
              ₹{product?.price}
            </span>

            <span className="text-gray-400 line-through text-sm">
              ₹{product?.mrp}
            </span>
          </div>

          {/* Savings */}
          <p className="text-green-600 text-sm font-medium mt-1">
            Save ₹{product?.mrp - product?.price}
          </p>
        </div>
      </div>
    )
}

export default ProductCard;