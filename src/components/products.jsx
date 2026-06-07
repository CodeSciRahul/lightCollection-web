import ProductCard from "./ui/productCard";
import { useProducts } from "../hooks/useProducts";

const Products = () => {
  const { data, isLoading, isError } = useProducts();
  const products = data?.products || [];

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-b from-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 text-center">Loading products...</div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-20 bg-gradient-to-b from-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
          Unable to load products right now.
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-pink-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-pink-500 uppercase tracking-widest font-semibold">
            Products You Might Like
          </span>

          <h2 className="text-4xl md:text-5xl font-black mt-3">
            Top Picks You'll Love
          </h2>
        </div>

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
