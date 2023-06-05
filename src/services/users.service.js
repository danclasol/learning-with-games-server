import { SALT } from '#Constants/bycript.js';
import { EmailAlreadyExistsError } from '#Errors/EmailAlreadyExistsError.js';
import { UserNotExistsException } from '#Errors/UserNotExistsException.js';
import UserModel from '#Models/user.model.js';
import { removeIdMongoDB } from '#Utils/removeIdMongoDB.js';
import { hash } from 'bcrypt';
import crypto from 'crypto';

export const findUserById = async ({ id }) => {
	const data = await UserModel.findOne({
		_id: id,
	}).exec();

	const user = data !== null && removeIdMongoDB(data);

	return user;
};

export const findUserByEmail = async ({ email }) => {
	const data = await UserModel.findOne({
		email,
	}).exec();

	const user = data !== null && removeIdMongoDB(data);

	return user;
};

export const existsUserByIdService = async ({ id }) => {
	const user = await UserModel.findOne({ _id: id }).exec();

	return Boolean(user);
};

export const existsUserByEmailService = async email => {
	const user = await UserModel.findOne({ email }).exec();

	return Boolean(user);
};

export const createUserService = async ({ name, email, password }) => {
	const userExists = await existsUserByEmailService(email);

	if (userExists) {
		throw new EmailAlreadyExistsError('Email already exists');
	}

	const hashedPassword = await hash(password, SALT);

	const user = new UserModel({
		_id: crypto.randomUUID(),
		name,
		email,
		password: hashedPassword,
	});

	const newUser = await user.save();
	const resultUser = removeIdMongoDB(newUser);

	return resultUser;
};

export const updateUserService = async ({ id, name, email }) => {
	const userExists = await existsUserByIdService({ id });

	if (!userExists) {
		throw new UserNotExistsException('User not exists');
	}

	const resultUpdate = await UserModel.updateOne(
		{ _id: id },
		{
			$set: {
				name,
				email,
			},
		}
	);

	return resultUpdate.modifiedCount > 0;
};

export const deleteUserService = async ({ id }) => {
	const userExists = await existsUserByIdService({ id });

	if (!userExists) {
		throw new UserNotExistsException('User not exists');
	}

	const resultDelete = await UserModel.deleteOne({ _id: id });

	return resultDelete.deletedCount > 0;
};
