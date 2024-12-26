import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";

const PlaceOrder = () => {
	const [method, setMethod] = useState("cod");
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		street: "",
		city: "",
		state: "",
		zipCode: "",
		country: "",
		phone: "",
	});
	const {
		navigate,
		backendUrl,
		token,
		cartItems,
		setCartItems,
		getCartAmount,
		delivery_fee,
		products,
	} = useContext(ShopContext);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmitHandler = async (e) => {
		e.preventDefault();

		try {
			let orderItems = [];

			for (const items in cartItems) {
				for (const item in cartItems[items]) {
					if (cartItems[items][item] > 0) {
						const itemInfo = structuredClone(
							products.find((product) => product._id === items)
						);
						if (itemInfo) {
							itemInfo.size = item;
							itemInfo.quantity = cartItems[items][item];
							orderItems.push(itemInfo);
						}
					}
				}
			}

			let orderData = {
				address: formData,
				items: orderItems,
				amount: getCartAmount() + delivery_fee,
			};

			switch (method) {
				case "cod": {
					const response = await axios.post(
						backendUrl + "/api/order/place-order",
						orderData,
						{ headers: { token } }
					);
					if (response.data.success) {
						setCartItems({});
						navigate("/orders");
					} else {
						toast.error(response.data.message);
					}
					break;
				}
				case "stripe": {
					const stripeResponse = await axios.post(
						backendUrl + "/api/order/place-order/stripe",
						orderData,
						{ headers: { token } }
					);
					if (stripeResponse.data.success) {
						const { session_url } = stripeResponse.data;
						window.location.replace(session_url);
						setCartItems({});
					} else {
						toast.error(stripeResponse.data.message);
					}
					break;
				}
				case "razorpay": {
					const response = await axios.post(
						backendUrl + "/api/order/place-order/razorpay",
						orderData,
						{ headers: { token } }
					);
					if (response.data.success) {
						setCartItems({});
						navigate("/orders");
					} else {
						toast.error(response.data.message);
					}
					break;
				}

				default:
					break;
			}
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};

	return (
		<form
			onSubmit={onSubmitHandler}
			className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
		>
			{/* --------------- LEFT SIDE ---------------- */}
			<div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
				<div className="text-xl sm:text-2xl my-3">
					<Title text1={"DELIVERY"} text2={" INFORMATION"} />
				</div>

				<div className="flex gap-3">
					<input
						type="text"
						name="firstName"
						placeholder="Enter your first name"
						className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
						value={formData.firstName}
						onChange={handleChange}
						required
					/>
					<input
						type="text"
						name="lastName"
						placeholder="Enter your last name"
						className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
						value={formData.lastName}
						onChange={handleChange}
						required
					/>
				</div>
				<input
					type="email"
					name="email"
					placeholder="Enter your email address"
					className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
					value={formData.email}
					onChange={handleChange}
					required
				/>
				<input
					type="text"
					name="street"
					placeholder="Street"
					className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
					value={formData.street}
					onChange={handleChange}
					required
				/>
				<div className="flex gap-3">
					<input
						type="text"
						name="city"
						placeholder="City"
						className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
						value={formData.city}
						onChange={handleChange}
						required
					/>
					<input
						type="text"
						name="state"
						placeholder="State"
						className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
						value={formData.state}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="flex gap-3">
					<input
						type="number"
						name="zipCode"
						placeholder="Zipcode"
						className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
						value={formData.zipCode}
						onChange={handleChange}
						required
					/>
					<input
						type="text"
						name="country"
						placeholder="Country"
						className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
						value={formData.country}
						onChange={handleChange}
						required
					/>
				</div>
				<input
					type="number"
					name="phone"
					placeholder="Phone number"
					className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
					value={formData.phone}
					onChange={handleChange}
					required
				/>
			</div>

			{/* --------------- RIGHT SIDE ---------------- */}
			<div className="mt-8">
				<div className="mt-8 min-w-80">
					<CartTotal />
				</div>

				<div className="mt-12">
					<Title text1={"PAYMENT"} text2={" METHOD"} />
					<div className="flex gap-3 flex-col lg:flex-row">
						<div
							className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
							onClick={() => setMethod("stripe")}
						>
							<p
								className={`min-w-3.5 h-3.5 border rounded-full ${
									method === "stripe" ? "bg-green-400" : ""
								}`}
							></p>
							<img
								src={assets.stripe_logo}
								className="h-5 mx-4"
								alt="Stripe logo"
							/>
						</div>
						{/* <div
							className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
							onClick={() => setMethod("razorpay")}
						>
							<p
								className={`min-w-3.5 h-3.5 border rounded-full ${
									method === "razorpay" ? "bg-green-400" : ""
								}`}
							></p>
							<img
								src={assets.razorpay_logo}
								className="h-5 mx-4"
								alt="Razorpay logo"
							/>
						</div> */}
						<div
							className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
							onClick={() => setMethod("cod")}
						>
							<p
								className={`min-w-3.5 h-3.5 border rounded-full ${
									method === "cod" ? "bg-green-400" : ""
								}`}
							></p>
							<p className="text-gray-500 text-sm font-medium mx-4">
								CASH ON DELIVERY
							</p>
						</div>
					</div>

					<div className="w-full text-end mt-8">
						<button
							type="submit"
							className="bg-[#7091E6] text-white px-16 py-3 text-sm"
						>
							PLACE ORDER
						</button>
					</div>
				</div>
			</div>
		</form>
	);
};

export default PlaceOrder;
