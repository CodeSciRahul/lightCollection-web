import { Heart, Star } from "lucide-react";
import { apiRequest } from "../util/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ui/productCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await apiRequest("/products");
      setProducts(response.products || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-pink-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <span className="text-pink-500 uppercase tracking-widest font-semibold">
            Products You Might Like
          </span>

          <h2 className="text-4xl md:text-5xl font-black mt-3">
            Top Picks You'll Love
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product?._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;