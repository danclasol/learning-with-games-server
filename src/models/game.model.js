import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const GameSchema = new Schema(
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

const GameModel = model('Game', GameSchema, 'games');

export default GameModel;
