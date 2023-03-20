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
		pairs: [
			{
				id: { type: String },
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
