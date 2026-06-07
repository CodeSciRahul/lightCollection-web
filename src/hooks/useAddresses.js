import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../lib/queryKeys.js";
import { showSuccessToast } from "../lib/toast.js";
import { createAddress, getAddresses } from "../services/addressService.js";

export const useAddresses = () =>
  useQuery({
    queryKey: queryKeys.addresses,
    queryFn: getAddresses,
    meta: {
      errorMessage: "Failed to load addresses.",
    },
  });

export const useCreateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.addresses });
      showSuccessToast("Address saved successfully");
    },
    meta: {
      errorMessage: "Could not save address.",
    },
  });
};
