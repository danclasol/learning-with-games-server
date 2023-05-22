import GroupModel from '#Models/group.model.js';
import { existsGroupByIdService } from './groups.service.js';

export const createCollectionService = async ({
	id,
	name,
	parentId,
	groupId,
	userId,
}) => {
	const groupExists = await existsGroupByIdService({ id: groupId });

	if (!groupExists) {
		throw new Error('Group not exists');
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
		throw new Error('Group not exists');
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

export const deleteCollectionService = async ({ id, groupId }) => {
	const groupExists = await existsGroupByIdService({ id: groupId });

	if (!groupExists) {
		throw new Error('Group not exists');
	}

	const resultDelete = await GroupModel.updateOne(
		{ _id: groupId },
		{
			$pull: {
				collections: { id },
			},
		}
	);

	return resultDelete.modifiedCount > 0;
};
