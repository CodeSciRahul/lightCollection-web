import {useState, useEffect} from "react"
import { apiRequest } from "../util/api";
const Address = () => {
    const [address, setAddress] = useState([]);
    const [cart, setCart] = useState([])

    useEffect(() => {
        const fetchCart = async () => {
            const response = await apiRequest("/addresses");
            const cartResponse = await apiRequest("/cart")
            setAddress(response?.addresses)
            setCart(cartResponse)
        };

        fetchCart();
    }, []);
    return (
        <div>
            <h1>Address</h1>
        </div>
    )
}

export default Address