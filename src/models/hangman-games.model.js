import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const HangmanGameSchema = new Schema(
	{
		_id: {
			type: String,
		},
		type: {
			type: String,
		},
		title: {
			type: String,
			required: true,
			minlength: 2,
			maxlength: 30,
			trim: true,
		},
		creationDate: {
			type: Date,
			required: true,
		},
		words: [
			{
				id: { type: String },
				text: { type: String },
			},
		],
		userId: {
			type: String,
			required: true,
		},
	},
	{
		_id: false,
		timestamps: true,
		versionKey: false,
	}
);

const HangmanGameModel = model('HangmanGame', HangmanGameSchema, 'games');

export default HangmanGameModel;
