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
		app.listen(PORT, (result) => {
			console.log("mongoDb connected and server has been started at 3001");
		});
	})
	.catch((err) => console.log("error in connecting in db"));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("frontend/build"));

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
