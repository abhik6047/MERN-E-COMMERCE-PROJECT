import { useContext, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
	const [visible, setVisible] = useState(false);
	const location = useLocation();
	const {
		setShowSearch,
		getCartCount,
		navigate,
		token,
		setToken,
		setCartItems,
	} = useContext(ShopContext);

	const logout = () => {
		localStorage.removeItem("token");
		setToken("");
		setCartItems({});
		navigate("/login");
	};

	return (
		<div className="flex items-center justify-between py-5 font-medium">
			<Link to="/">
				<img src={assets.logo} alt="logo" className="w-40" />
			</Link>

			<ul className="hidden sm:flex gap-5 text-sm text-gray-700">
				<NavLink className="flex flex-col items-center gap-1" to="/">
					<p>HOME</p>
					<hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
				</NavLink>
				<NavLink className="flex flex-col items-center gap-1" to="/collection">
					<p>COLLECTION</p>
					<hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
				</NavLink>
				<NavLink className="flex flex-col items-center gap-1" to="/about">
					<p>ABOUT</p>
					<hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
				</NavLink>
				<NavLink className="flex flex-col items-center gap-1" to="/contact">
					<p>CONTACT</p>
					<hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
				</NavLink>
				{/* <NavLink
					className="flex flex-col items-center gap-1 border rounded-md p-2"
					to="https://mern-e-commerce-project-admin.vercel.app/"
					target="_blank"
				>
					<p>ADMIN PANEL</p>
					<hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
				</NavLink> */}
			</ul>

			<div className="flex items-center gap-6">
				{location.pathname === "/collection" && (
					<img
						src={assets.search_icon}
						alt="Search icon"
						className="w-5 cursor-pointer"
						onClick={() => setShowSearch(true)}
					/>
				)}
				<div className="group relative">
					<img
						src={assets.profile_icon}
						alt="Profile icon"
						className="w-5 cursor-pointer"
						onClick={() => (token ? null : navigate("/login"))}
					/>

					{token ? (
						<div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
							<div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
								<p className="cursor-pointer hover:text-black">My Profile</p>
								<p
									className="cursor-pointer hover:text-black"
									onClick={() => navigate("/orders")}
								>
									Orders
								</p>
								<p className="cursor-pointer hover:text-black" onClick={logout}>
									Logout
								</p>
							</div>
						</div>
					) : null}
				</div>

				<Link to="/cart" className="relative">
					<img src={assets.cart_icon} alt="Cart icon" className="w-5 min-w-5" />
					<p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-[#7091E6] text-white aspect-square rounded-full text-[8px]">
						{getCartCount()}
					</p>
				</Link>
				<img
					src={assets.menu_icon}
					alt="Menu icon"
					className="w-5 cursor-pointer sm:hidden"
					onClick={() => setVisible(true)}
				/>

				<div>
					<NavLink
						className="flex flex-col items-center gap-1 border rounded-full px-5 py-1 text-sm"
						to="https://mern-e-commerce-project-admin.vercel.app/"
						target="_blank"
					>
						<p>ADMIN</p>
						<hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
					</NavLink>
				</div>
			</div>

			{/* Sidebar menu for small screens */}

			<div
				className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
					visible ? "w-full" : "w-0"
				}`}
			>
				<div className="flex flex-col text-gray-600">
					<div
						className="flex items-center gap-4 p-3 cursor-pointer"
						onClick={() => setVisible(false)}
					>
						<img
							src={assets.dropdown_icon}
							alt="Dropdown icon"
							className="h-4 rotate-180"
						/>
						<p>Back</p>
					</div>

					<NavLink
						className="py-2 pl-6 border"
						to="/"
						onClick={() => setVisible(false)}
					>
						HOME
					</NavLink>
					<NavLink
						className="py-2 pl-6 border"
						to="/collection"
						onClick={() => setVisible(false)}
					>
						COLLECTION
					</NavLink>
					<NavLink
						className="py-2 pl-6 border"
						to="/about"
						onClick={() => setVisible(false)}
					>
						ABOUT
					</NavLink>
					<NavLink
						className="py-2 pl-6 border"
						to="/contact"
						onClick={() => setVisible(false)}
					>
						CONTACT
					</NavLink>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
