import {
	createUserService,
	deleteUserService,
	findUserById,
	updateUserService,
} from '#Services/users.service.js';

export const getCurrentUser = async (req, res) => {
	const userId = req.userId;

	try {
		const user = await findUserById({ id: userId });

		if (user) {
			res.status(200).json(user);
		} else {
			res.status(404).json({ error: 'User not exists' });
		}
	} catch (err) {
		res.status(500).send();
	}
};

export const getUserById = async (req, res) => {
	const { id } = req.params;

	try {
		const user = await findUserById({ id });

		if (user) {
			res.status(200).json(user);
		} else {
			res.status(404).json({ error: 'User not exists' });
		}
	} catch (err) {
		res.status(500).send();
	}
};

export const createUser = async (req, res) => {
	const { body } = req;
	const { id, name, email } = body;

	try {
		const newUser = await createUserService({
			id,
			name,
			email,
		});

		if (!newUser) {
			res.status(400).json({ error: 'User not exists' });
		}

		res.status(202).json(newUser);
	} catch (err) {
		res.status(500).send();
	}
};

export const updateUser = async (req, res) => {
	const { id } = req.params;
	const { body } = req;
	const { name, email } = body;

	try {
		const updateResult = await updateUserService({
			id,
			name,
			email,
		});

		if (updateResult) {
			res.sendStatus(200);
		} else {
			res.status(400).json({ error: 'User not exists' });
		}
	} catch (err) {
		res.status(500).send();
	}
};

export const deleteUser = async (req, res) => {
	const { id } = req.params;

	try {
		const deletedResult = await deleteUserService({ id });

		if (deletedResult) {
			res.sendStatus(200);
		} else {
			res.status(400).json({ error: 'User not exists' });
		}
	} catch (err) {
		res.status(500).send();
	}
};
