import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import userModel from "../models/userModel.js";

const createToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET_KEY);
};

// Route for user login
const loginUser = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		const user = await userModel.findOne({ email });

		if (!user) {
			return res.json({
				success: false,
				message: "User not found!",
			});
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (isMatch) {
			const token = createToken(user._id);
			res.json({
				success: true,
				token,
			});
		} else {
			res.json({
				success: false,
				message: "Invalid credentials!",
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

// Route for user registration
const registerUser = async (req, res, next) => {
	try {
		const { name, email, password } = req.body;

		// Checking email already exists or not.
		const emailExists = await userModel.findOne({ email });

		if (emailExists) {
			return res.json({
				success: false,
				message: "Email already exists.",
			});
		}

		// Validating email format and strong password
		if (!validator.isEmail(email)) {
			return res.json({
				success: false,
				message: "Please enter a valid email address.",
			});
		}

		if (password.length < 8) {
			return res.json({
				success: false,
				message: "Please enter a strong password.",
			});
		}

		// Hashing user password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new userModel({
			name,
			email,
			password: hashedPassword,
		});

		const user = await newUser.save();

		const token = createToken(user._id);

		res.json({
			success: true,
			token,
		});
	} catch (error) {
		console.log(error);
		res.json({
			success: false,
			message: error.message,
		});
	}
};

// Route for admin login
const adminLogin = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		if (
			email === process.env.ADMIN_EMAIL &&
			password === process.env.ADMIN_PASSWORD
		) {
			const token = jwt.sign(email + password, process.env.JWT_SECRET_KEY);
			res.json({
				success: true,
				token,
			});
		} else {
			res.json({
				success: false,
				message: "Invalid credentials !",
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

export { adminLogin, loginUser, registerUser };
