import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const UserSchema = new Schema(
	{
		_id: { type: String },
		name: {
			type: String,
			required: true,
			minlength: 2,
			maxlength: 30,
			trim: true,
		},
		email: { type: String, required: true, unique: true },
		password: { type: String, require: true },
	},
	{
		_id: false,
		timestamps: true,
		versionKey: false,
	}
);

const UserModel = model('User', UserSchema, 'users');

export default UserModel;
