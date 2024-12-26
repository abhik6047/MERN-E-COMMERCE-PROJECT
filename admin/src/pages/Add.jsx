import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { backendURL } from "../App";
import { assets } from "../assets/assets";

const Add = () => {
	const [image1, setImage1] = useState(false);
	const [image2, setImage2] = useState(false);
	const [image3, setImage3] = useState(false);
	const [image4, setImage4] = useState(false);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("Men");
	const [subCategory, setSubCategory] = useState("Topwear");
	const [price, setPrice] = useState(0);
	const [isBestSeller, setIsBestSeller] = useState(false);
	const [sizes, setSizes] = useState([]);

	const onSubmitHandler = async (e) => {
		e.preventDefault();

		try {
			const formData = new FormData();

			formData.append("name", name);
			formData.append("description", description);
			formData.append("price", price);
			formData.append("category", category);
			formData.append("subCategory", subCategory);
			formData.append("bestseller", isBestSeller);
			formData.append("sizes", JSON.stringify(sizes));
			image1 && formData.append("image1", image1);
			image2 && formData.append("image2", image2);
			image3 && formData.append("image3", image3);
			image4 && formData.append("image4", image4);

			const response = await axios.post(
				backendURL + "/api/product/add",
				formData,
				{
					headers: {
						token: localStorage.getItem("token"),
					},
				}
			);

			if (response.data.success) {
				toast.success(response.data.message);
				setName("");
				setDescription("");
				setImage1(false);
				setImage2(false);
				setImage3(false);
				setImage4(false);
				setPrice(0);
				setCategory("Men");
				setSubCategory("Topwear");
				setSizes([]);
				setIsBestSeller(false);
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			toast.error(error.message);
			console.log(error);
		}
	};

	return (
		<form
			className="flex flex-col w-full items-start gap-3"
			onSubmit={onSubmitHandler}
		>
			<div>
				<p className="mb-2">Upload Image</p>
				<div className="flex gap-2">
					<label htmlFor="image1">
						<img
							src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
							alt="Upload area"
							className="w-20"
						/>
						<input
							type="file"
							id="image1"
							hidden
							onChange={(e) => {
								setImage1(e.target.files[0]);
							}}
						/>
					</label>
					<label htmlFor="image2">
						<img
							src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
							alt="Upload area"
							className="w-20"
						/>
						<input
							type="file"
							id="image2"
							hidden
							onChange={(e) => {
								setImage2(e.target.files[0]);
							}}
						/>
					</label>
					<label htmlFor="image3">
						<img
							src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
							alt="Upload area"
							className="w-20"
						/>
						<input
							type="file"
							id="image3"
							hidden
							onChange={(e) => {
								setImage3(e.target.files[0]);
							}}
						/>
					</label>
					<label htmlFor="image4">
						<img
							src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
							alt="Upload area"
							className="w-20"
						/>
						<input
							type="file"
							id="image4"
							hidden
							onChange={(e) => {
								setImage4(e.target.files[0]);
							}}
						/>
					</label>
				</div>
			</div>
			<div className="w-full">
				<p className="mb-2">Product Name</p>
				<input
					type="text"
					placeholder="Product Name"
					required
					className="w-full max-w-[500px] px-3 py-2"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</div>

			<div className="w-full">
				<p className="mb-2">Product Description</p>
				<textarea
					type="text"
					placeholder="Product Description"
					required
					className="w-full max-w-[500px] px-3 py-2"
					rows={4}
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
			</div>

			<div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
				<div>
					<p className="mb-2">Product Category</p>
					<select
						className="w-full px-3 py-2"
						value={category}
						onChange={(e) => setCategory(e.target.value)}
					>
						<option value="Men">Men</option>
						<option value="Women">Women</option>
						<option value="Kids">Kids</option>
					</select>
				</div>

				<div>
					<p className="mb-2">Product Sub-Category</p>
					<select
						className="w-full px-3 py-2"
						value={subCategory}
						onChange={(e) => setSubCategory(e.target.value)}
					>
						<option value="Topwear">Topwear</option>
						<option value="Bottomwear">Bottomwear</option>
						<option value="Winterwear">Winterwear</option>
					</select>
				</div>

				<div>
					<p className="mb-2">Product Price</p>
					<input
						type="number"
						placeholder="Price"
						required
						className="w-full px-3 py-2 sm:w-[120px]"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
					/>
				</div>
			</div>

			<div>
				<p className="mb-2">Product Sizes</p>
				<div className="flex gap-3">
					<div
						onClick={() =>
							setSizes((prev) =>
								prev.includes("S")
									? prev.filter((item) => item !== "S")
									: [...prev, "S"]
							)
						}
					>
						<p
							className={`${
								sizes.includes("S")
									? "bg-pink-100 border border-pink-800"
									: "bg-slate-200"
							} px-3 py-1 cursor-pointer `}
						>
							S
						</p>
					</div>

					<div
						onClick={() =>
							setSizes((prev) =>
								prev.includes("M")
									? prev.filter((item) => item !== "M")
									: [...prev, "M"]
							)
						}
					>
						<p
							className={`${
								sizes.includes("M")
									? "bg-pink-100 border border-pink-800"
									: "bg-slate-200"
							} px-3 py-1 cursor-pointer `}
						>
							M
						</p>
					</div>

					<div
						onClick={() =>
							setSizes((prev) =>
								prev.includes("L")
									? prev.filter((item) => item !== "L")
									: [...prev, "L"]
							)
						}
					>
						<p
							className={`${
								sizes.includes("L")
									? "bg-pink-100 border border-pink-800"
									: "bg-slate-200"
							} px-3 py-1 cursor-pointer `}
						>
							L
						</p>
					</div>

					<div
						onClick={() =>
							setSizes((prev) =>
								prev.includes("XL")
									? prev.filter((item) => item !== "XL")
									: [...prev, "XL"]
							)
						}
					>
						<p
							className={`${
								sizes.includes("XL")
									? "bg-pink-100 border border-pink-800"
									: "bg-slate-200"
							} px-3 py-1 cursor-pointer `}
						>
							XL
						</p>
					</div>

					<div
						onClick={() =>
							setSizes((prev) =>
								prev.includes("XXL")
									? prev.filter((item) => item !== "XXL")
									: [...prev, "XXL"]
							)
						}
					>
						<p
							className={`${
								sizes.includes("XXL")
									? "bg-pink-100 border border-pink-800"
									: "bg-slate-200"
							} px-3 py-1 cursor-pointer `}
						>
							XXL
						</p>
					</div>
				</div>
			</div>

			<div className="flex gap-2 mt-2">
				<input
					type="checkbox"
					id="bestseller"
					checked={isBestSeller}
					onChange={() => setIsBestSeller(!isBestSeller)}
				/>
				<label className="cursor-pointer" htmlFor="bestseller">
					Best Seller
				</label>
			</div>

			<button type="submit" className="w-28 py-3 mt-4 bg-[#7091E6] text-white ">
				Add Product
			</button>
		</form>
	);
};

export default Add;
