import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";

const Login = () => {
	const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
	const [currentState, setCurrentState] = useState("Login");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");

	const onSubmitHandler = async (e) => {
		e.preventDefault();

		if (currentState === "Sign Up") {
			try {
				const response = await axios.post(backendUrl + "/api/user/register", {
					name,
					email,
					password,
				});

				if (response.data.success) {
					toast.success("User registered successfully");
					setToken(response.data.token);
					localStorage.setItem("token", response.data.token);
				} else {
					toast.error(response.data.message);
				}
			} catch (error) {
				console.log(error);
				toast.error(error.message);
			}
		} else {
			try {
				const response = await axios.post(backendUrl + "/api/user/login", {
					email,
					password,
				});

				if (response.data.success) {
					toast.success("Logged in successfully");
					setToken(response.data.token);
					localStorage.setItem("token", response.data.token);
				} else {
					toast.error(response.data.message);
				}
			} catch (error) {
				console.log(error);
				toast.error(error.message);
			}
		}
	};

	useEffect(() => {
		if (token) {
			navigate("/");
		}
	}, [token]);

	return (
		<form
			onSubmit={onSubmitHandler}
			className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
		>
			<div className="inline-flex items-center gap-2 mb-2 mt-10">
				<p className="prata-regular text-3xl">{currentState}</p>
				<hr className="border-none h-[1.5px] w-8 bg-gray-800" />
			</div>

			{currentState === "Sign Up" && (
				<input
					type="text"
					className="w-full px-3 py-2 border border-gray-800"
					placeholder="Name"
					required
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			)}
			<input
				type="email"
				className="w-full px-3 py-2 border border-gray-800"
				placeholder="Email"
				required
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type="password"
				className="w-full px-3 py-2 border border-gray-800"
				placeholder="Password"
				required
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>

			<div className="w-full flex justify-between text-sm mt-[-8px]">
				<p className="cursor-pointer">Forgot your password?</p>
				{currentState === "Login" ? (
					<p
						className="cursor-pointer"
						onClick={() => setCurrentState("Sign Up")}
					>
						Create an account
					</p>
				) : (
					<p
						className="cursor-pointer"
						onClick={() => setCurrentState("Login")}
					>
						Login here
					</p>
				)}
			</div>

			<button className="bg-black text-white font-light px-8 py-2 mt-4">
				{currentState === "Login" ? "Login" : "Sign Up"}
			</button>
		</form>
	);
};

export default Login;
