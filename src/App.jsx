import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import Login from "./pages/login";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout.jsx"
import ProductDetail from "./pages/ProductDetail";
import Bag from "./pages/Bag.jsx"
import Address from "./pages/Address.jsx"
import Payment from "./pages/Payment.jsx"
import "@radix-ui/themes/styles.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/auth" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />}>
          <Route path="bag" element={<Bag />}/>
          <Route path="address" element={ <Address />}/>
          <Route path="payment" element={<Payment />}/>
          </Route>

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
