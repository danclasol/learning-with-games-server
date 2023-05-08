import {
	cloneGameService,
	createGameService,
	deleteGameService,
	findGameById,
	findUserGamesService,
	findUserTotalGameService,
	updateGameService,
} from '#Services/games.service.js';

export const getUserGames = async (req, res) => {
	const userId = req.userId;
	const { groupId, title, type, page, limit, sort, order } = req.query;

	try {
		const totalGames = await findUserTotalGameService({
			userId,
			groupId,
			title,
			type,
		});

		const games = await findUserGamesService({
			userId,
			groupId,
			title,
			type,
			page,
			limit,
			sort,
			order,
		});

		if (games) {
			res.set('total-count', totalGames.length);
			res.set('Access-Control-Expose-Headers', 'total-count');

			res.status(200).json(games);
		} else {
			res.status(404).json({ error: 'User not exists' });
		}
	} catch (err) {
		res.status(500).send();
	}
};

export const getGameById = async (req, res) => {
	const userId = req.userId;
	const { id } = req.params;

	try {
		const game = await findGameById({ id, userId });

		if (game) {
			res.status(200).json(game);
		} else {
			res.status(404).json({ error: 'Game not exists' });
		}
	} catch (err) {
		res.status(500).send();
	}
};

export const createGame = async (req, res) => {
	const userId = req.userId;
	const { body } = req;
	const { id, type, title, groupId } = body;

	try {
		const newGame = await createGameService({
			id,
			type,
			title,
			groupId,
			userId,
		});

		if (!newGame) {
			res.status(400).json({ error: 'Game not created' });
		}

		res.status(202).json(newGame);
	} catch (err) {
		res.status(500).send();
	}
};

export const cloneGame = async (req, res) => {
	const userId = req.userId;
	const { body } = req;
	const { idOld, idNew, type, title, groupId } = body;

	try {
		const newGame = await cloneGameService({
			idOld,
			idNew,
			type,
			title,
			groupId,
			userId,
		});

		if (!newGame) {
			res.status(400).json({ error: 'Game not created' });
		}

		res.status(202).json(newGame);
	} catch (err) {
		res.status(500).send();
	}
};

export const updateGame = async (req, res) => {
	const userId = req.userId;
	const { id } = req.params;
	const { body } = req;
	const { title, groupId } = body;

	try {
		const updateResult = await updateGameService({
			id,
			title,
			groupId,
			userId,
		});

		if (updateResult) {
			res.status(200).send();
		} else {
			res.status(400).json({ error: 'Game not exists' });
		}
	} catch (err) {
		res.status(500).send();
	}
};

export const deleteGame = async (req, res) => {
	const userId = req.userId;
	const { id } = req.params;

	try {
		const deletedResult = await deleteGameService({ id, userId });

		if (deletedResult) {
			res.sendStatus(200);
		} else {
			res.status(400).json({ error: 'Game not deleted' });
		}
	} catch (err) {
		res.status(500).json();
	}
};
