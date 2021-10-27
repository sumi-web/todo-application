import jwt from "jsonwebtoken";

export const tokenVerify = (req, res, next) => {
	const cookie = req.cookies;

	if (!cookie) {
		res.status(401).send("Access Denied");
	}

	try {
		const verified = jwt.verify(cookie.jwt, process.env.JWT_TOKEN_SECRET);
		// saving user here to get user in any private route
		req.user = verified;
		next();
	} catch (err) {
		res.status(400).send("Invalid Token");
	}
};
