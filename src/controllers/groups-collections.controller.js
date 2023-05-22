import {
	createCollectionService,
	deleteCollectionService,
	updateCollectionService,
} from '#Services/group-collections.service.js';

export const createCollection = async (req, res) => {
	const userId = req.userId;
	const { body } = req;
	const { id: groupId } = req.params;
	const { id, name, parentId } = body;

	try {
		const newCollection = await createCollectionService({
			id,
			name,
			parentId,
			groupId,
			userId,
		});

		if (!newCollection) {
			res.status(400).json({ error: 'Collection not created' });
		}

		res.status(202).json(newCollection);
	} catch (err) {
		res.status(500).send();
	}
};

export const updateCollection = async (req, res) => {
	const userId = req.userId;
	const { id, collectionId } = req.params;
	const { body } = req;
	const { name, parentId } = body;

	try {
		const updateResult = await updateCollectionService({
			id: collectionId,
			name,
			parentId,
			groupId: id,
			userId,
		});

		if (updateResult) {
			res.status(200).send();
		} else {
			res.status(400).json({ error: 'Collection not updated' });
		}
	} catch (err) {
		res.status(500).send();
	}
};

export const deleteCollection = async (req, res) => {
	const userId = req.userId;
	const { id, collectionId } = req.params;

	try {
		const deletedResult = await deleteCollectionService({
			id: collectionId,
			groupId: id,
			userId,
		});

		if (deletedResult) {
			res.sendStatus(200);
		} else {
			res.status(400).json({ error: 'Collection not deleted' });
		}
	} catch (err) {
		res.status(500).json();
	}
};
