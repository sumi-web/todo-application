import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//logging user
export const userLogin = async (req, res) => {
	const { email, password } = req.body;
	// checking if email already exist
	const user = await User.findOne({ email });
	if (!user) return res.status(400).json({ isLogged: false, error: "email does not exist" });
	// checking password
	// const validPass = await bcrypt.compare(password, user.password);
	const validPass = password === user.password;
	if (!validPass) return res.status(400).json({ isLoggedIn: false, error: "incorrect password" });

	//  create and assign a token
	const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN_SECRET);
	res.cookie("jwt", token, { maxAge: 1000 * 60 * 60 });
	res.status(200).json({ isLoggedIn: true, user });
};

// signing up user
export const userSignUp = async (req, res) => {
	const { fullName, email, password } = req.body;

	//checking if email already exist
	const emailExist = await User.findOne({ email });

	if (emailExist) return res.status(400).json({ isLoggedIn: false, error: "email already exist" });

	// create a hash passwords
	// const salt = await bcrypt.getSalt(10);
	// const hashedPassword = await bcrypt.hash(password, salt);

	const user = new User({
		name: fullName,
		email,
		password,
	});

	try {
		const createdUser = await user.save();
		const token = jwt.sign({ userId: createdUser._id }, process.env.JWT_TOKEN_SECRET, { expiresIn: "2 hr" });

		res.cookie("jwt", token, { maxAge: 60 * 60 * 1000 });

		res.status(200).json({ isLOggedIn: true, user: createdUser });
	} catch (err) {
		console.log("error found in signing up", err);
		res.status(400).send(err);
	}
};

export const verifyToken = (req, res) => {
	const cookie = req.cookies;

	if (cookie.jwt) {
		jwt.verify(cookie.jwt, process.env.JWT_TOKEN_SECRET, async (err, decoded) => {
			if (err) {
				res.status(200).json({ isLoggedIn: false });
			} else {
				const user = await User.findOne({ _id: decoded._id });
				res.status(200).json({ isLoggedIn: true, user });
			}
		});
	} else {
		res.status(200).json({ isLoggedIn: false });
	}
};

export const logoutUser = (req, res) => {
	res.clearCookie("jwt");
	res.send({ success: true });
};
