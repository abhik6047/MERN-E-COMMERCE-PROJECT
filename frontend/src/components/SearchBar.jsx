import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

const SearchBar = () => {
	const location = useLocation();
	const { search, setSearch, showSearch, setShowSearch } =
		useContext(ShopContext);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		if (location.pathname.includes("collection")) {
			setVisible(true);
		} else {
			setVisible(false);
		}
	}, [location]);

	return showSearch && visible ? (
		<div className="border-t border-b bg-gray-50 text-center">
			<div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
				<input
					type="text"
					placeholder="Search"
					className="flex-1 outline-none bg-inherit text-sm"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<img src={assets.search_icon} className="w-4" alt="search icon" />
			</div>
			<img
				src={assets.cross_icon}
				alt="cross icon"
				className="inline w-3 cursor-pointer"
				onClick={() => {
					setShowSearch(false);
				}}
			/>
		</div>
	) : null;
};

export default SearchBar;