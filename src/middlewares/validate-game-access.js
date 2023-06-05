import { GameNotExistsException } from '#Errors/GameNotExistsException.js';
import { findGameById } from '#Services/games.service.js';

const checkGameAccess = async (req, res, next) => {
	const { id } = req.params;
	const userId = req.userId;

	try {
		const gameExists = await findGameById({ userId, id });

		if (!gameExists) {
			throw new GameNotExistsException('Game does not exist');
		}

		if (gameExists.userId !== userId) {
			return res.status(401).send();
		}

		next();
	} catch (error) {
		return res.status(401).send();
	}
};

export default checkGameAccess;
