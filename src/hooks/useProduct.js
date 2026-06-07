import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../lib/queryKeys.js";
import { getProductBySlug } from "../services/productService.js";

export const useProduct = (slug) =>
  useQuery({
    queryKey: queryKeys.products.detail(slug),
    queryFn: () => getProductBySlug(slug),
    enabled: !!slug,
    meta: {
      errorMessage: "Failed to load product details.",
    },
  });
