import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";

const Orders = () => {
	const { currency, backendUrl, token } = useContext(ShopContext);
	const [orderData, setOrderData] = useState([]);

	const fetchOrderData = async () => {
		try {
			const response = await axios.post(
				backendUrl + "/api/order/userOrders",
				{},
				{ headers: { token } }
			);

			if (response.data.success) {
				let allOrdersItem = [];
				response.data.orders.map((order) => {
					order.items.map((item) => {
						item["status"] = order.status;
						item["payment"] = order.payment;
						item["paymentMethod"] = order.paymentMethod;
						item["date"] = order.date;

						allOrdersItem.push(item);
					});
				});
				setOrderData(allOrdersItem.reverse());
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};

	useEffect(() => {
		fetchOrderData();
	}, [token]);

	console.log(orderData);

	return (
		<div className="border-t pt-16">
			<div className="text-2xl">
				<Title text1={"MY"} text2={" ORDERS"} />
			</div>

			<div className="">
				{orderData?.map((product) => {
					return (
						<div
							key={product._id}
							className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
						>
							<div className="flex items-start gap-6 text-sm">
								<img
									src={product?.image[0]}
									alt="Product image"
									className="w-16 sm:w-20"
								/>
								<div>
									<p className="sm:text-base font-medium">{product.name}</p>
									<div className="flex items-center gap-3 mt-2 text-base text-gray-700">
										<p>
											{currency} {product.price}
										</p>
										<p>Quantity : {product.quantity}</p>
										<p>Size : {product.size}</p>
									</div>
									<p className="mt-1">
										Date:{" "}
										<span className="text-gray-400">
											{new Date(product.date).toDateString()}
										</span>
									</p>
									<p className="mt-1">
										Payment:{" "}
										<span className="text-gray-400">
											{product.paymentMethod}
										</span>
									</p>
								</div>
							</div>

							<div className="md:w-1/2 flex justify-between">
								<div className="flex items-center gap-2">
									<p className="min-w-2 h-2 rounded-full bg-green-500"></p>
									<p className="text-sm md:text-base">{product.status}</p>
								</div>

								<button
									className="border px-4 py-2 text-sm font-medium rounded-sm"
									onClick={() => {
										fetchOrderData();
									}}
								>
									Track Order
								</button>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Orders;
