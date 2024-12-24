import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";

export const backendURL = import.meta.env.VITE_BACKEND_URL;
export const currency = "$";

function App() {
	const [token, setToken] = useState(localStorage.getItem("token") ?? "");

	useEffect(() => {
		localStorage.setItem("token", token);
	}, [token]);

	return (
		<div className="bg-gray-50 min-h-screen">
			<ToastContainer />
			{token ? (
				<>
					<Navbar setToken={setToken} />
					<hr />
					<div className="flex w-full">
						<Sidebar />
						<div className="w-[70%] mx-auto ml-[max(5vw, 25px)] my-8 text-gray-600 text-base">
							<Routes>
								<Route path="/" element={<Add token={token} />} />
								<Route path="/list" element={<List token={token} />} />
								<Route path="/orders" element={<Orders token={token} />} />
							</Routes>
						</div>
					</div>
				</>
			) : (
				<Login setToken={setToken} />
			)}
		</div>
	);
}

export default App;
