import GroupModel from '#Models/group.model.js';
import { removeIdMongoDB } from '#Utils/removeIdMongoDB.js';

export const findUserTotalGroupsService = async ({ userId, name = '' }) => {
	const filter = {
		userId,
		name: { $regex: name, $options: 'i' },
	};

	return await GroupModel.find(filter).exec();
};

export const findUserGroupsService = async ({
	userId,
	name = '',
	page,
	limit,
	sort,
	order,
}) => {
	const filter = {
		userId,
		name: { $regex: name, $options: 'i' },
	};

	const groups = await GroupModel.find(filter)
		.sort({ [sort]: order })
		.skip((page - 1) * 10)
		.limit(limit)
		.exec();

	const groupsResult = groups.map(group => removeIdMongoDB(group));

	return groupsResult;
};

export const findGroupById = async ({ id }) => {
	const data = await GroupModel.findOne({
		_id: id,
		// userId,
	}).exec();

	const group = data !== null && removeIdMongoDB(data);

	return group;
};

export const existsGroupByIdService = async ({ id }) => {
	const game = await GroupModel.findOne({ _id: id }).exec();
	return Boolean(game);
};

export const createGroupService = async ({
	id,
	name,
	level,
	course,
	userId,
}) => {
	const groupExists = await existsGroupByIdService({ id });

	if (groupExists) {
		throw new Error('Group already exists');
	}

	const group = GroupModel({
		_id: id,
		name,
		level,
		course,
		creationDate: new Date(),
		userId,
	});

	const newGroup = await group.save();
	const resultGroup = removeIdMongoDB(newGroup);

	return resultGroup;
};

export const updateGroupService = async ({
	id,
	name,
	level,
	course,
	games,
}) => {
	const groupExists = await existsGroupByIdService({ id });

	if (!groupExists) {
		throw new Error('Group not exists');
	}

	const resultUpdate = await GroupModel.updateOne(
		{ _id: id },
		{
			$set: {
				name,
				level,
				course,
				games,
			},
		}
	);

	return resultUpdate.modifiedCount > 0;
};

export const deleteGroupService = async ({ id }) => {
	const groupExists = await existsGroupByIdService({ id });

	if (!groupExists) {
		throw new Error('Group not exists');
	}

	const resultDelete = await GroupModel.deleteOne({ _id: id });

	return resultDelete.deletedCount > 0;
};
