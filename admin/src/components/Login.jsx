import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { backendURL } from "../App";

const Login = ({ setToken }) => {
	const [email, setEmail] = useState("admin@ecommerce.com");
	const [password, setPassword] = useState("Qwerty@123");

	const onSubmitHandler = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(backendURL + "/api/user/admin", {
				email,
				password,
			});

			if (response.data.success) {
				setToken(response.data.token);
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center w-full">
			<div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
				<h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
				<form onSubmit={onSubmitHandler}>
					<div className="mb-3 min-w-72">
						<p className="text-sm font-medium text-gray-700 mb-2">
							Email Address
						</p>
						<input
							type="email"
							placeholder="Email"
							required
							className="rounder-md w-full px-3 py-2 border border-gray-300 outline-none"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="mb-3 min-w-72">
						<p className="text-sm font-medium text-gray-700 mb-2">Password</p>
						<input
							type="password"
							placeholder="Password"
							required
							className="rounder-md w-full px-3 py-2 border border-gray-300 outline-none"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<button
						className="mt-2 w-full py-2 px-4 rounded-md text-white bg-[#7091E6]"
						type="submit"
					>
						Login
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
