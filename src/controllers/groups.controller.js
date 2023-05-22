import {
	cloneGroupService,
	createGroupService,
	deleteGroupService,
	findGroupById,
	findUserGroupsService,
	findUserTotalGroupsService,
	updateGroupService,
} from '#Services/groups.service.js';

export const getUserGroups = async (req, res) => {
	const userId = req.userId;
	const { name, page, limit, sort, order } = req.query;

	try {
		const totalGroups = await findUserTotalGroupsService({ userId, name });

		const groups = await findUserGroupsService({
			userId,
			name,
			page,
			limit,
			sort,
			order,
		});

		if (groups) {
			res.set('total-count', totalGroups.length);
			res.set('Access-Control-Expose-Headers', 'total-count');

			res.status(200).json(groups);
		} else {
			res.status(404).json({ error: 'User not exists' });
		}
	} catch (err) {
		res.status(500).send();
	}
};

export const getGroupById = async (req, res) => {
	const userId = req.userId;
	const { id } = req.params;

	try {
		const group = await findGroupById({ id, userId });

		if (group) {
			res.status(200).json(group);
		} else {
			res.status(404).json({ error: 'Group not exists' });
		}
	} catch (err) {
		res.status(500).send();
	}
};

export const createGroup = async (req, res) => {
	const userId = req.userId;
	const { body } = req;
	const { id, name, level, course } = body;

	try {
		const newGroup = await createGroupService({
			id,
			name,
			level,
			course,
			userId,
		});

		if (!newGroup) {
			res.status(400).json({ error: 'Group not created' });
		}

		res.status(202).json(newGroup);
	} catch (err) {
		res.status(500).send();
	}
};

export const cloneGroup = async (req, res) => {
	const userId = req.userId;
	const { body } = req;
	const { idOld, idNew, name, level, course, options } = body;

	try {
		const newGroup = await cloneGroupService({
			idOld,
			idNew,
			name,
			level,
			course,
			options,
			userId,
		});

		if (!newGroup) {
			res.status(400).json({ error: 'Group not created' });
		}

		res.status(202).json(newGroup);
	} catch (err) {
		res.status(500).send();
	}
};

export const updateGroup = async (req, res) => {
	const userId = req.userId;
	const { id } = req.params;
	const { body } = req;
	const { name, level, course } = body;

	try {
		const updateResult = await updateGroupService({
			id,
			name,
			level,
			course,
			userId,
		});

		if (updateResult) {
			res.status(200).send();
		} else {
			res.status(400).json({ error: 'Group not exists' });
		}
	} catch (err) {
		res.status(500).send();
	}
};

export const deleteGroup = async (req, res) => {
	const userId = req.userId;
	const { id } = req.params;

	try {
		const deletedResult = await deleteGroupService({ id, userId });

		if (deletedResult) {
			res.sendStatus(200);
		} else {
			res.status(400).json({ error: 'Group not deleted' });
		}
	} catch (err) {
		res.status(500).json();
	}
};
