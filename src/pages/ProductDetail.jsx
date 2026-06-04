import { useState, useEffect } from "react";
import {
    Heart,
    Star,
    ShoppingBag,
    Truck,
    ShieldCheck,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { apiRequest } from "../util/api";
import Header from "../components/header";
import { useSearchParams } from 'react-router-dom';
import ProductCard from "../components/ui/productCard";

const ProductDetail = () => {
    const [product, setProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const { slug } = useParams();
    const cat = searchParams.get("cat");
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await apiRequest(`/products/${slug}`);
            const products = await apiRequest(`/products?category=${cat}`);
            const reviews = await apiRequest(`/reviews/product/${response?.product?._id}`);
            setProduct(response?.product || []);
            setSelectedVariant(response?.product?.variants[0] || null);
            setSelectedImage(response?.product?.images[0] || null);
            setProducts(products?.products || []);
            setReviews(reviews?.reviews || []);
        };
        fetchProduct();
    }, [slug]);

    const addToCart = async (productId, variantSku) => {
        try {
           const response = await apiRequest("/cart/items", {
                method: "POST",
                body: {
                    productId, 
                    variantSku
                }
            })
            if(response?.success){
                alert("item added successfully")
            }
        } catch (error) {
            console.log("error", error)
            alert("something went wrong")

        }
    }

    return (
        <div>
            <Header />
            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="grid lg:grid-cols-2 gap-10">
                    {/* Images */}
                    <div>
                        <div className="rounded-3xl overflow-hidden bg-gray-100">
                            <img
                                src={selectedImage}
                                alt={product?.title || ""}
                                className="w-full h-[700px] object-cover hover:scale-105 transition duration-500"
                            />
                        </div>

                        <div className="flex gap-3 mt-4 overflow-x-auto">
                            {product?.images?.map((image) => (
                                <button
                                    key={image}
                                    onClick={() => setSelectedImage(image)}
                                    className={`border rounded-xl overflow-hidden ${selectedImage === image
                                        ? "border-pink-500"
                                        : "border-gray-200"
                                        }`}
                                >
                                    <img
                                        src={image}
                                        className="w-20 h-20 object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div>
                        <div className="flex gap-2 mb-4">
                            {product?.isTrending && (
                                <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm">
                                    Trending
                                </span>
                            )}

                            {product?.isNewArrival && (
                                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                                    New Arrival
                                </span>
                            )}

                            {product?.isOnSale && (
                                <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm">
                                    Sale
                                </span>
                            )}
                        </div>

                        <h1 className="text-4xl font-bold">
                            {product?.title}
                        </h1>

                        <p className="text-gray-500 mt-2">
                            {product?.category?.name}
                        </p>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mt-4">
                            <Star
                                fill="currentColor"
                                className="text-yellow-500"
                                size={18}
                            />
                            <span className="font-medium">
                                {product?.rating?.average}
                            </span>

                            <span className="text-gray-500">
                                ({product?.rating?.count} reviews)
                            </span>
                        </div>

                        {/* Price */}
                        <div className="mt-6">
                            <div className="flex items-center gap-3">
                                <span className="text-4xl font-bold text-pink-600">
                                    ₹{selectedVariant?.price}
                                </span>

                                <span className="text-gray-400 line-through text-xl">
                                    ₹{selectedVariant?.mrp}
                                </span>

                                <span className="text-green-600 font-semibold">
                                    {product?.discountPercent}% OFF
                                </span>
                            </div>

                            <p className="text-green-600 mt-2">
                                You save ₹
                                {selectedVariant?.mrp -
                                    selectedVariant?.price}
                            </p>
                        </div>

                        {/* Description */}
                        <div className="mt-8">
                            <h3 className="font-semibold text-lg">
                                Description
                            </h3>

                            <p className="text-gray-600 mt-2">
                                {product?.description}
                            </p>
                        </div>

                        {/* Color */}
                        <div className="mt-8">
                            <h3 className="font-semibold mb-3">
                                Color
                            </h3>

                            <div className="flex gap-3">
                                <div
                                    className="w-10 h-10 rounded-full border-2 border-gray-300"
                                    style={{
                                        backgroundColor:
                                            selectedVariant?.colorHex,
                                    }}
                                />
                            </div>

                            <p className="mt-2 text-gray-600">
                                {selectedVariant?.color}
                            </p>
                        </div>

                        {/* Sizes */}
                        <div className="mt-8">
                            <h3 className="font-semibold mb-3">
                                Select Size
                            </h3>

                            <div className="flex gap-3 flex-wrap">
                                {product?.variants?.map((variant) => (
                                    <button
                                        key={variant._id}
                                        onClick={() =>
                                            setSelectedVariant(variant || null)
                                        }
                                        className={`px-5 py-3 rounded-xl border ${selectedVariant?._id === variant?._id
                                            ? "bg-black text-white"
                                            : "border-gray-300"
                                            }`}
                                    >
                                        {variant?.size}
                                    </button>
                                ))}
                            </div>

                            <p className="mt-3 text-sm text-gray-500">
                                {selectedVariant?.stock} pieces available
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4 mt-10">
                            <button
                            onClick={() => addToCart(product?._id, selectedVariant?.sku)}
                                className="flex-1 cursor-pointer bg-pink-600 text-white py-4 rounded-2xl font-semibold hover:bg-pink-700"
                            >
                                Add To Bag
                            </button>

                            {/* <button
                                className="flex-1 cursor-pointer bg-black text-white py-4 rounded-2xl font-semibold"
                            >
                                Buy Now
                            </button> */}

                            <button
                                className="p-4 cursor-pointer border rounded-2xl"
                            >
                                <Heart />
                            </button>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-3 gap-4 mt-10">
                            <div className="text-center">
                                <Truck className="mx-auto" />
                                <p className="text-sm mt-2">
                                    Free Delivery
                                </p>
                            </div>

                            <div className="text-center">
                                <ShieldCheck className="mx-auto" />
                                <p className="text-sm mt-2">
                                    Secure Payment
                                </p>
                            </div>

                            <div className="text-center">
                                <ShoppingBag className="mx-auto" />
                                <p className="text-sm mt-2">
                                    Easy Returns
                                </p>
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="mt-10">
                            <h3 className="font-semibold mb-3">
                                Tags
                            </h3>

                            <div className="flex flex-wrap gap-2">
                                {product?.tags?.map((tag) => (
                                    <span
                                        key={tag}
                                        className=" px-3 py-1 bg-gray-100 rounded-full text-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews */}
                <section className="mt-20 pt-12">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold">
                                Customer Reviews
                            </h2>

                            <div className="flex items-center gap-3 mt-2">
                                <div className="flex items-center gap-1">
                                    <Star
                                        fill="currentColor"
                                        className="text-yellow-500"
                                        size={20}
                                    />

                                    <span className="font-semibold text-lg">
                                        {product?.rating?.average}
                                    </span>
                                </div>

                                <span className="text-gray-500">
                                    Based on {product?.rating?.count} reviews
                                </span>
                            </div>
                        </div>
                    </div>

                    {reviews?.length > 0 ? (
                        <div className="space-y-6">
                            {reviews.map((review) => (
                                <div
                                    key={review._id}
                                    className="
            bg-white
            border
            rounded-2xl
            p-6
            shadow-sm
          "
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="
                    w-10
                    h-10
                    rounded-full
                    bg-pink-100
                    flex
                    items-center
                    justify-center
                    font-semibold
                    text-pink-600
                  "
                                                >
                                                    {review?.user?.name?.charAt(0)?.toUpperCase()}
                                                </div>

                                                <div>
                                                    <h4 className="font-semibold">
                                                        {review?.user?.name}
                                                    </h4>

                                                    {review?.isVerifiedPurchase && (
                                                        <span className="text-xs text-green-600">
                                                            ✓ Verified Purchase
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    size={16}
                                                    fill={
                                                        star <= review.rating
                                                            ? "currentColor"
                                                            : "none"
                                                    }
                                                    className={
                                                        star <= review.rating
                                                            ? "text-yellow-500"
                                                            : "text-gray-300"
                                                    }
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <h5 className="font-semibold mt-4">
                                        {review.title}
                                    </h5>

                                    <p className="text-gray-600 mt-2">
                                        {review.comment}
                                    </p>

                                    {review.images?.length > 0 && (
                                        <div className="flex gap-3 mt-4 overflow-x-auto">
                                            {review.images.map((img) => (
                                                <img
                                                    key={img}
                                                    src={img}
                                                    alt="review"
                                                    className="
                    w-24
                    h-24
                    rounded-xl
                    object-cover
                    border
                  "
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div
                            className="
        text-center
        py-12
        bg-gray-50
        rounded-2xl
      "
                        >
                            <h3 className="font-semibold text-lg">
                                No Reviews Yet
                            </h3>

                            <p className="text-gray-500 mt-2">
                                Be the first customer to review this product.
                            </p>
                        </div>
                    )}
                </section>

                {/* Similar Products */}
                <section className="mt-20">
                    <h2 className="text-3xl font-bold mb-8">
                        You May Also Like
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {products?.map((product) => (
                            <ProductCard key={product?._id} product={product} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ProductDetail;