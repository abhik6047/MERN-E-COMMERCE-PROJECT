import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { backendURL, currency } from "../App";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
	const [orders, setOrders] = useState([]);

	const fetchAllOrders = async () => {
		if (!token) {
			return null;
		}

		try {
			const response = await axios.post(
				backendURL + "/api/order/list",
				{},
				{
					headers: {
						token,
					},
				}
			);

			if (response.data.success) {
				setOrders(response.data.orders);
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};

	const statusHandler = async (e, orderId) => {
		try {
			const response = await axios.post(
				backendURL + "/api/order/status",
				{ orderId, status: e.target.value },
				{ headers: { token } }
			);

			if (response.data.success) {
				toast.success(response.data.message);
				fetchAllOrders();
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};

	useEffect(() => {
		fetchAllOrders();
	}, [token]);

	return (
		<div>
			<h3>Order Page</h3>
			<div>
				{orders.map((order) => {
					return (
						<div
							key={order._id}
							className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
						>
							<img
								src={assets.parcel_icon}
								alt="Parcel icon"
								className="w-12"
							/>
							<div>
								<div>
									{order.items.map((item, index) => {
										if (index === order.items.length - 1) {
											return (
												<p key={index} className="py-0.5">
													{item.name} x {item.quantity} <span>{item.size}</span>
												</p>
											);
										} else {
											return (
												<p key={index} className="py-0.5">
													{item.name} x {item.quantity} <span>{item.size}</span>
													,
												</p>
											);
										}
									})}
								</div>
								<p className="mt-3 mb-2 font-medium">
									{order.address.firstName + " " + order.address.lastName}
								</p>
								<div>
									<p>{order.address.street + ", "}</p>
									<p>
										{order.address.city +
											", " +
											order.address.state +
											", " +
											order.address.country +
											", " +
											order.address.zipCode}
									</p>
								</div>
								<p>{order.address.phone}</p>
							</div>
							<div>
								<p className="text-sm sm:text-[15px]">
									Items : {order.items.length}
								</p>
								<p className="mt-3">Payment Method : {order.paymentMethod}</p>
								<p>Payment : {order.payment ? "Done" : "Pending"}</p>
								<p>Date : {new Date(order.date).toLocaleDateString()}</p>
							</div>
							<p className="text-sm sm:text-[15px]">
								{currency} {order.amount}
							</p>
							<select
								className="p-2 font-semibold"
								value={order.status}
								onChange={(e) => statusHandler(e, order._id)}
							>
								<option value="Order Placed">Order Placed</option>
								<option value="Packing">Packing</option>
								<option value="Shipped">Shipped</option>
								<option value="Out for delivery">Out for delivery</option>
								<option value="Delivered">Delivered</option>
							</select>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Orders;
