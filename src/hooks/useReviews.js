import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../lib/queryKeys.js";
import { getProductReviews } from "../services/reviewService.js";

export const useProductReviews = (productId) =>
  useQuery({
    queryKey: queryKeys.reviews.byProduct(productId),
    queryFn: () => getProductReviews(productId),
    enabled: !!productId,
    meta: {
      errorMessage: "Failed to load reviews.",
      errorToast: false,
    },
  });
