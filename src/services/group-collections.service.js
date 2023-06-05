import { CollectionNotExistsException } from '#Errors/CollectionNotExistsException.js';
import { GroupNotExistsException } from '#Errors/GroupNotExistsException.js';
import GroupModel from '#Models/group.model.js';
import { deleteGamesFromCollectionService } from './games.service.js';
import { existsGroupByIdService, findGroupById } from './groups.service.js';

export const findCollectionByParentService = async ({
	groupId,
	collectionId,
}) => {
	const filter = {
		_id: groupId,
	};

	const group = await GroupModel.findOne(filter).exec();

	const collections = group?.collections.filter(
		item => item.parentId === collectionId
	);

	return collections;
};

export const createCollectionService = async ({
	id,
	name,
	parentId,
	groupId,
	userId,
}) => {
	const groupExists = await existsGroupByIdService({ id: groupId });

	if (!groupExists) {
		throw new GroupNotExistsException('Group not exists');
	}

	const newCollection = {
		id,
		name,
		parentId,
		groupId,
		creationDate: new Date(),
	};

	const resultUpdate = await GroupModel.updateOne(
		{ _id: groupId },
		{
			$push: { collections: newCollection },
		}
	);

	return resultUpdate.modifiedCount > 0;
};

export const updateCollectionService = async ({
	id,
	name,
	parentId,
	groupId,
}) => {
	const groupExists = await existsGroupByIdService({ id: groupId });

	if (!groupExists) {
		throw new GroupNotExistsException('Group not exists');
	}

	const resultUpdate = await GroupModel.updateOne(
		{ _id: groupId, 'collections.id': id },
		{
			$set: {
				'collections.$.name': name,
				'collections.$.parentId': parentId,
			},
		}
	);

	return resultUpdate.modifiedCount > 0;
};

export const deleteCollectionService = async ({ collectionId, groupId }) => {
	const groupExists = await findGroupById({ id: groupId });

	if (!groupExists) {
		throw new GroupNotExistsException('Group not exists');
	}

	const collectionExits = groupExists?.collections.find(
		item => item.id === collectionId
	);

	if (!collectionExits) {
		throw new CollectionNotExistsException('Collection not exists');
	}

	// Delete collection children
	const collections = await findCollectionByParentService({
		groupId,
		collectionId,
	});

	collections.forEach(async collection => {
		await deleteCollectionService({ collectionId: collection.id, groupId });
	});

	// Delete games from collection
	await deleteGamesFromCollectionService({ groupId, collectionId });

	// Delete collection
	const resultDelete = await GroupModel.updateOne(
		{ _id: groupId },
		{
			$pull: {
				collections: { id: collectionId },
			},
		}
	);

	return resultDelete.modifiedCount > 0;
};
