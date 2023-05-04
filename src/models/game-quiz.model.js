import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const QuizGameSchema = new Schema(
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
		questions: [
			{
				question: { type: String },
				image: { type: String },
				points: { type: Number },
				answer: { type: Number },
				options: [{ text: { type: String } }],
			},
		],
		groupId: {
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

const QuizGameModel = model('QuizGame', QuizGameSchema, 'games');

export default QuizGameModel;
