import { PAGINATION } from '#Constants/pagination.js';
import GroupModel from '#Models/group.model.js';
import { removeIdMongoDB } from '#Utils/removeIdMongoDB.js';
import crypto from 'crypto';
import {
	createGameService,
	deleteGameService,
	findAllGamesFromGroupService,
} from './games.service.js';

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
		.skip((page - 1) * PAGINATION.ITEMS_PER_PAGE)
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
	const group = await GroupModel.findOne({ _id: id }).exec();
	return Boolean(group);
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

export const cloneGroupService = async ({
	idOld,
	idNew,
	name,
	level,
	course,
	options,
	userId,
}) => {
	const groupExists = await findGroupById({ id: idOld });

	if (!groupExists) {
		throw new Error('Group to clone not exists');
	}

	const resultGroup = await createGroupService({
		id: idNew,
		name,
		level,
		course,
		creationDate: new Date(),
		userId,
	});

	if (options?.cloneGames) {
		await cloneGamesFromGroupService({
			idOld,
			idNew,
			userId,
		});
	}

	return resultGroup;
};

export const cloneGamesFromGroupService = async ({ idOld, idNew, userId }) => {
	const gamesToClone = await findAllGamesFromGroupService({ groupId: idOld });

	gamesToClone.forEach(async game => {
		// Clone properties
		const {
			id,
			type,
			title,
			creationDate,
			userId: useIdOld,
			createdAt,
			updatedAt,
			...props
		} = game;

		await createGameService({
			id: crypto.randomUUID(),
			type,
			title,
			props,
			groupId: idNew,
			userId,
		});
	});

	return true;
};

export const updateGroupService = async ({ id, name, level, course }) => {
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

	await deleteGamesFromGroupService({ id });

	return resultDelete.deletedCount > 0;
};

export const deleteGamesFromGroupService = async ({ id }) => {
	const gamesToDelete = await findAllGamesFromGroupService({ groupId: id });

	gamesToDelete.forEach(async game => {
		await deleteGameService({ id: game.id });
	});

	return true;
};
