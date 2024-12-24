import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Add Product
const addProduct = async (req, res, next) => {
	try {
		const {
			name,
			description,
			price,
			category,
			subCategory,
			sizes,
			bestseller,
		} = req.body;
		const image1 = req.files.image1 && req.files.image1[0];
		const image2 = req.files.image2 && req.files.image2[0];
		const image3 = req.files.image3 && req.files.image3[0];
		const image4 = req.files.image4 && req.files.image4[0];

		const images = [image1, image2, image3, image4].filter(
			(item) => item !== undefined
		);

		let imagesUrl = await Promise.all(
			images.map(async (item) => {
				let result = await cloudinary.uploader.upload(item.path, {
					resource_type: "image",
				});
				return result.secure_url;
			})
		);

		const productData = {
			name,
			description,
			price: Number(price),
			image: imagesUrl,
			category,
			subCategory,
			sizes: JSON.parse(sizes),
			bestseller: bestseller === "true" ? true : false,
			date: Date.now(),
		};

		console.log(productData);

		const product = new productModel(productData);

		await product.save();

		res.json({
			success: true,
			message: "Product saved successfully",
		});
	} catch (error) {
		res.json({
			success: false,
			message: error.message,
		});
	}
};

// List Products
const listProduct = async (req, res, next) => {
	try {
		const products = await productModel.find({});

		res.json({
			success: true,
			products,
		});
	} catch (error) {
		console.log(error);
		res.json({
			success: false,
			error: error.message,
		});
	}
};

// Remove Products
const removeProduct = async (req, res, next) => {
	try {
		const isSuccess = await productModel.findByIdAndDelete(req.body.id);

		if (isSuccess) {
			res.json({
				success: true,
				message: "Product removed successfully",
			});
		} else {
			res.json({
				success: false,
				message: "Unable to find the product!",
			});
		}
	} catch (error) {
		console.log(error);
		res.json({
			success: false,
			message: error.message,
		});
	}
};

// Single Product
const singleProduct = async (req, res, next) => {
	try {
		const { productId } = req.body;

		const product = await productModel.findById(productId);

		if (product) {
			res.json({
				success: true,
				product,
			});
		} else {
			res.json({
				success: false,
				message: "Product not found!",
			});
		}
	} catch (error) {
		res.json({
			success: false,
			message: error.message,
		});
	}
};

export { addProduct, listProduct, removeProduct, singleProduct };
