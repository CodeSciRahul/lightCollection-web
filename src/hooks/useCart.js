import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../lib/queryKeys.js";
import { showSuccessToast } from "../lib/toast.js";
import { addCartItem, getCart } from "../services/cartService.js";

export const useCart = () =>
  useQuery({
    queryKey: queryKeys.cart,
    queryFn: getCart,
    meta: {
      errorMessage: "Failed to load your bag.",
    },
  });

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, variantSku }) =>
      addCartItem(productId, variantSku),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart });
      showSuccessToast("Item added to bag");
    },
    meta: {
      errorMessage: "Could not add item to bag.",
    },
  });
};
