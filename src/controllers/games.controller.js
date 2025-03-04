import {
	cloneGameService,
	createGameService,
	deleteGameService,
	findGameById,
	findUserGamesService,
	findUserTotalGameService,
	updateGameService,
} from '#Services/games.service.js';

export const getUserGames = async (req, res, next) => {
	const userId = req.userId;
	const { groupId, collectionId, title, type, page, limit, sort, order } =
		req.query;

	try {
		const totalGames = await findUserTotalGameService({
			userId,
			groupId,
			collectionId,
			title,
			type,
		});

		const games = await findUserGamesService({
			userId,
			groupId,
			collectionId,
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
		next(err);
	}
};

export const getGameById = async (req, res, next) => {
	const { id } = req.params;

	try {
		const game = await findGameById({ id });

		if (game) {
			res.status(200).json(game);
		} else {
			res.status(404).json({ error: 'Game not exists' });
		}
	} catch (err) {
		next(err);
	}
};

export const createGame = async (req, res, next) => {
	const userId = req.userId;
	const { body } = req;
	const { id, type, title, groupId, collectionId } = body;

	try {
		const newGame = await createGameService({
			id,
			type,
			title,
			groupId,
			collectionId,
			userId,
		});

		if (!newGame) {
			res.status(400).json({ error: 'Game not created' });
		}

		res.status(202).json(newGame);
	} catch (err) {
		next(err);
	}
};

export const cloneGame = async (req, res, next) => {
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
		next(err);
	}
};

export const updateGame = async (req, res, next) => {
	const { id } = req.params;
	const { body } = req;
	const { title, groupId } = body;

	try {
		const updateResult = await updateGameService({
			id,
			title,
			groupId,
		});

		if (updateResult) {
			res.status(200).send();
		} else {
			res.status(400).json({ error: 'Game not exists' });
		}
	} catch (err) {
		next(err);
	}
};

export const deleteGame = async (req, res, next) => {
	const { id } = req.params;

	try {
		const deletedResult = await deleteGameService({ id });

		if (deletedResult) {
			res.sendStatus(200);
		} else {
			res.status(400).json({ error: 'Game not deleted' });
		}
	} catch (err) {
		next(err);
	}
};
