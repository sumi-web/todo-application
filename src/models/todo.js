import mongoose from "mongoose";

const { Schema } = mongoose;

const todoSchema = new Schema(
	{
		title: { type: String, required: true },
		desc: { type: String, required: true },
		status: { type: String, required: true },
		userId: { type: String, required: true },
	},
	{ timestamps: true }
);

export const Todo = mongoose.model("Todo", todoSchema);
