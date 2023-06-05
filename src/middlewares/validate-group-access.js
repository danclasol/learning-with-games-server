import { GroupNotExistsException } from '#Errors/GroupNotExistsException.js';
import { findGroupById } from '#Services/groups.service.js';

const checkGroupAccess = async (req, res, next) => {
	const { id } = req.params;
	const userId = req.userId;

	try {
		const groupExists = await findGroupById({ id });

		if (!groupExists) {
			throw new GroupNotExistsException('Group does not exist');
		}

		if (groupExists.userId !== userId) {
			return res.status(401).send();
		}

		next();
	} catch (error) {
		return res.status(401).send();
	}
};

export default checkGroupAccess;
