import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import authRouter from "./src/routers/auth.js";
import todoRouter from "./src/routers/todo.js";

// config .env file
dotenv.config();
// init app
const app = express();

const PORT = process.env.PORT || 3001;

//connect to mongoDB
mongoose
	.connect(process.env.SERVER_DB_URL)
	.then(() => {
		app.listen(PORT, () => {
			console.log(`mongoDb connected and server has been started at ${PORT}`);
		});
	})
	.catch((err) => console.log("error in connecting in db"));

//middleware
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));
app.use(cookieParser());

// for production build
if (process.env.NODE_ENV === "Production") {
	app.use(express.static("frontend/build"));
}

// routing middleware
app.use("/auth", authRouter);
app.use("/home", todoRouter);
//middleware for handling 404 page

app.get("*", (req, res) => {
	res.redirect("/");
});

app.use((req, res) => {
	res.status(404).send("404 page found");
});
