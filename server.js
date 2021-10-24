import express from "express";
import dotenv from "dotenv";
// init app
const app = express();
// config .env file
dotenv.config();

app.listen(30001, (result) => {
	console.log("server has been started at 30001");
});
