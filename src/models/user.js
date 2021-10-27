import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
	{
		name: { type: String, required: true, min: 6, max: 255 },
		email: { type: String, required: true, min: 6, max: 255 },
		password: { type: String, required: true, max: 1024, min: 6, select: false },
	},
	{ timestamps: true }
);
export const User = mongoose.model("User", userSchema);
