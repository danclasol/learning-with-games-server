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
			maxlength: 50,
			trim: true,
		},
		creationDate: {
			type: Date,
			required: true,
		},
		words: [
			{
				word: { type: String },
				maxTries: { type: Number },
			},
		],
		groupId: {
			type: String,
		},
		collectionId: {
			type: String,
		},
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
