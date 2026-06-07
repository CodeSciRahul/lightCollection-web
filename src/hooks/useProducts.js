import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../lib/queryKeys.js";
import { getProducts } from "../services/productService.js";

export const useProducts = (params = {}) =>
  useQuery({
    queryKey: queryKeys.products.list(params),
    queryFn: () => getProducts(params),
    meta: {
      errorMessage: "Failed to load products.",
    },
  });
