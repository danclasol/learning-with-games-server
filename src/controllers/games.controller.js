import {
	createGameService,
	deleteGameService,
	findGameById,
	findUserGamesService,
	findUserTotalGameService,
	updateGameService,
} from '#Services/games.service.js';

export const getUserGames = async (req, res) => {
	const userId = req.userId;
	const { title, type, page, limit, sort, order } = req.query;

	const totalGames = await findUserTotalGameService({ userId, title, type });

	const games = await findUserGamesService({
		userId,
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
		res.status(404).json('User not exists');
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
			res.status(404).json('Game not exists');
		}
	} catch (err) {
		res.status(400).json('Game not exists');
	}
};

export const createGame = async (req, res) => {
	const userId = req.userId;
	const { body } = req;
	const { id, type, title } = body;

	try {
		const newGame = await createGameService({
			id,
			type,
			title,
			userId,
		});

		if (!newGame) {
			res.status(400).json('Game not exists');
		}

		res.status(202).json(newGame);
	} catch (err) {
		res.status(400).json(err.message);
	}
};

export const updateGame = async (req, res) => {
	const userId = req.userId;
	const { id } = req.params;
	const { body } = req;
	const { type, title } = body;

	try {
		const updateResult = await updateGameService({
			id,
			type,
			title,
			userId,
		});

		if (updateResult) {
			res.sendStatus(200);
		} else {
			res.status(400).json('Game not updted');
		}
	} catch (err) {
		res.status(400).json(err.message);
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
			res.status(400).json('Game not deleted');
		}
	} catch (err) {
		res.status(400).json(err.message);
	}
};
