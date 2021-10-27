import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//logging user
export const userLogin = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email }).select("+password").exec();
		// checking if email already exist
		if (!user) return res.status(400).json({ isLogged: false, error: "email does not exist" });
		// checking password

		const validPass = await bcrypt.compare(password, user.password);

		if (!validPass) return res.status(400).json({ isLoggedIn: false, error: "incorrect password" });

		//  create and assign a token
		const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN_SECRET);
		res.cookie("jwt", token, { maxAge: 1000 * 60 * 60 });
		res.status(200).json({ isLoggedIn: true, user });
	} catch (err) {
		console.log("err in logging in server", err);
		res.status(400).json({ isLoggedIn: false });
	}
};

// signing up user
export const userSignUp = async (req, res) => {
	const { fullName, email, password } = req.body;

	//checking if email already exist
	const emailExist = await User.findOne({ email });

	if (emailExist) return res.status(400).json({ isLoggedIn: false, error: "email already exist" });

	const hashPassword = await bcrypt.hashSync(password, 10);

	const user = new User({
		name: fullName,
		email,
		password: hashPassword,
	});

	try {
		const createdUser = await user.save();
		const token = jwt.sign({ userId: createdUser._id }, process.env.JWT_TOKEN_SECRET, { expiresIn: "2 hr" });

		res.cookie("jwt", token, { maxAge: 60 * 60 * 1000 });

		res.status(200).json({ isLoggedIn: true, user: createdUser });
	} catch (err) {
		console.log("error found in signing up", err);
		res.status(400).send(err);
	}
};

//verify token
export const verifyToken = (req, res) => {
	const cookie = req.cookies;

	if (cookie.jwt) {
		jwt.verify(cookie.jwt, process.env.JWT_TOKEN_SECRET, async (err, decoded) => {
			if (err) {
				res.status(200).json({ isLoggedIn: false });
			} else {
				console.log("check decod", decoded);
				const user = await User.findOne({ _id: decoded.userId });

				res.status(200).json({ isLoggedIn: true, user });
			}
		});
	} else {
		res.status(200).json({ isLoggedIn: false });
	}
};

// logout
export const logoutUser = (req, res) => {
	res.clearCookie("jwt");
	res.send({ success: true });
};

//get all user
export const GetAllUsers = async (req, res) => {
	try {
		const allUsers = await User.find();

		if (allUsers) {
			res.status(200).json({ data: allUsers });
		}
	} catch (err) {
		console.log("err in getting all users in server", err);
		res.status(400).send(err);
	}
};

// update user details
export const UpdateUser = async (req, res) => {
	const { userId, data } = req.body;

	try {
		const updatedUser = await User.findByIdAndUpdate(userId, data, { new: true });

		if (updatedUser) {
			res.status(200).json({ success: true, user: updatedUser });
		}
	} catch (err) {
		console.log("error in updating user in server", err);
		res.status(400).send(err);
	}
};
