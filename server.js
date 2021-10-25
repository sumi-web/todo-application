import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import authRouter from "./src/routers/auth.js";

// init app
const app = express();
// config .env file
dotenv.config();

//connect to mongoDB
mongoose
	.connect(process.env.SERVER_DB_URL)
	.then(() => {
		app.listen(3001, (result) => {
			console.log("mongoDb connect and server has been started at 3001");
		});
	})
	.catch((err) => console.log("error in connecting in db"));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/auth", authRouter);
//middleware for handling 404 page
app.use((req, res) => {
	res.status(404).send("404 page found");
});
