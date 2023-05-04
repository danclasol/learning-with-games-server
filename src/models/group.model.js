import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const GroupSchema = new Schema(
	{
		_id: {
			type: String,
		},
		type: {
			type: String,
		},
		name: {
			type: String,
			required: true,
			minlength: 4,
			maxlength: 50,
			trim: true,
		},
		level: {
			type: String,
			minlength: 2,
			maxlength: 30,
			trim: true,
		},
		course: {
			type: String,
			minlength: 2,
			maxlength: 30,
			trim: true,
		},
		creationDate: {
			type: Date,
			required: true,
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

const GroupModel = model('Group', GroupSchema, 'groups');

export default GroupModel;
