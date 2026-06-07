import { useAddresses } from "../hooks/useAddresses";
import { useCart } from "../hooks/useCart";

const Address = () => {
  const { data: addressData } = useAddresses();
  const { data: cart } = useCart();

  const addresses = addressData?.addresses || [];

  return (
    <div>
      <h1>Address</h1>
      <p>{addresses.length} saved addresses</p>
      <p>Cart items: {cart?.itemCount ?? 0}</p>
    </div>
  );
};

export default Address;
