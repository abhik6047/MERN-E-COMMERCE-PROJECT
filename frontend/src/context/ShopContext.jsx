/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { products } from "../assets/assets";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
	const currency = "$";
	const delivery_fee = 10;
	const backendUrl = import.meta.env.VITE_BACKEND_URL;
	const navigate = useNavigate();
	const [search, setSearch] = useState("");
	const [showSearch, setShowSearch] = useState(false);
	const [cartItems, setCartItems] = useState({});
	const [products, setProducts] = useState([]);
	const [token, setToken] = useState("");

	const getProductData = async () => {
		try {
			const response = await axios.get(backendUrl + "/api/product/list");

			if (response.data.success) {
				setProducts(response.data.products);
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};

	const getUserCart = async (tokenId) => {
		try {
			const response = await axios.post(
				backendUrl + "/api/cart/get",
				{},
				{ headers: { token: tokenId } }
			);

			if (response.data.success) {
				setCartItems(response.data.cartData);
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};

	useEffect(() => {
		getProductData();
	}, []);

	useEffect(() => {
		if (!token && localStorage.getItem("token")) {
			setToken(localStorage.getItem("token"));
			getUserCart(localStorage.getItem("token"));
		}
	}, []);

	const addToCart = async (itemId, size) => {
		if (!size) {
			toast.error("Select Product Size");
			return;
		}
		let cartData = structuredClone(cartItems);

		if (cartData[itemId]) {
			if (cartData[itemId][size]) {
				cartData[itemId][size] += 1;
			} else {
				cartData[itemId][size] = 1;
			}
		} else {
			cartData[itemId] = {};
			cartData[itemId][size] = 1;
		}

		setCartItems(cartData);

		if (token) {
			try {
				const response = await axios.post(
					backendUrl + "/api/cart/add",
					{ itemId, size },
					{
						headers: { token },
					}
				);

				if (response.data.success) {
					toast.success("Cart added successfully");
				} else {
					toast.error(response.data.message);
				}
			} catch (error) {
				console.log(error);
				toast.error(error.message);
			}
		}
	};

	const getCartCount = () => {
		let totalCount = 0;
		for (const items in cartItems) {
			for (const item in cartItems[items]) {
				try {
					if (cartItems[items][item] > 0) {
						totalCount += cartItems[items][item];
					}
				} catch (error) {
					console.log("error in getCartCount", error);
				}
			}
		}

		return totalCount;
	};

	const updateQuantity = async (itemId, size, quantity) => {
		let cartData = structuredClone(cartItems);

		cartData[itemId][size] = quantity;

		setCartItems(cartData);

		if (token) {
			try {
				const response = await axios.post(
					backendUrl + "/api/cart/update",
					{ itemId, size, quantity },
					{
						headers: { token },
					}
				);

				if (response.data.success) {
					toast.success("Updated successfully");
				} else {
					toast.error(response.data.message);
				}
			} catch (error) {
				console.log(error);
				toast.error(error.message);
			}
		}
	};

	const getCartAmount = () => {
		let totalAmount = 0;

		// console.log(cartItems);

		for (const items in cartItems) {
			let itemInfo = products.find((product) => product._id === items);
			for (const item in cartItems[items]) {
				try {
					if (cartItems[items][item] > 0) {
						totalAmount += itemInfo.price * cartItems[items][item];
					}
				} catch (error) {
					console.log("Error in getCartAmount", error);
				}
			}
		}
		return totalAmount;
	};

	const value = {
		products,
		currency,
		delivery_fee,
		search,
		setSearch,
		showSearch,
		setShowSearch,
		cartItems,
		setCartItems,
		addToCart,
		getCartCount,
		updateQuantity,
		getCartAmount,
		navigate,
		backendUrl,
		token,
		setToken,
	};

	return (
		<ShopContext.Provider value={value}>{props?.children}</ShopContext.Provider>
	);
};

export default ShopContextProvider;