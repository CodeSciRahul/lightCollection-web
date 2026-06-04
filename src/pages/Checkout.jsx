import { Outlet } from "react-router-dom";
import CheckoutHeader from "../components/checkoutHeader"
const Checkout = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <CheckoutHeader />

            <main className="max-w-7xl mx-auto px-4 py-8">
                <Outlet />
            </main>
        </div>
    );
};

export default Checkout;