import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const FindingPairsGameSchema = new Schema(
	{
		_id: {
			type: String,
		},
		type: {
			type: String,
		},
		mode: {
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
		pairs: [
			{
				text: { type: String },
				image: { type: String },
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

const FindingPairsGameModel = model(
	'FindingPairsGame',
	FindingPairsGameSchema,
	'games'
);

export default FindingPairsGameModel;
