import {useState, useEffect} from "react"
import { apiRequest } from "../util/api";
const Address = () => {
    const [address, setAddress] = useState([]);

    useEffect(() => {
        const fetchCart = async () => {
            const response = await apiRequest("/addresses");
            setAddress(response?.addresses)
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