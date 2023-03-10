import {
	createGameService,
	deleteGameService,
	findGameById,
	findUserGamesService,
	updateGameService,
} from '#Services/games.service.js';

export const getUserGames = async (req, res) => {
	const userId = req.userId;

	const { title, page, limit, sort, order } = req.query;

	const games = await findUserGamesService({
		userId,
		title,
		page,
		limit,
		sort,
		order,
	});

	if (games) {
		res.status(200).json(games);
	} else {
		res.status(404).json('Usuario no existe');
	}
};

export const getGameById = async (req, res) => {
	const { id } = req.params;
	const userId = req.userId;

	try {
		const game = await findGameById({ userId, id });

		if (game) {
			res.status(200).json(game);
		} else {
			res.status(404).json('Juego no existe');
		}
	} catch (err) {
		res.status(400).json('Juego no existe');
	}
};

export const createGame = async (req, res) => {
	const userId = 'dani@gmail.com';
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
			res.status(400).json('Juego no creado');
		}

		res.status(202).json(newGame);
	} catch (err) {
		res.status(400).json(err.message);
	}
};

export const updateGame = async (req, res) => {
	const userId = 'dani@gmail.com';
	const { id } = req.params;
	const { body } = req;
	const { type, title } = body;

	try {
		const updateResult = await updateGameService({ id, type, title, userId });

		if (updateResult) {
			res.sendStatus(200);
		} else {
			res.status(400).json('Juego no actualizado');
		}
	} catch (err) {
		res.status(400).json(err.message);
	}
};

export const deleteGame = async (req, res) => {
	const { id } = req.params;

	try {
		const deletedResult = await deleteGameService(id);

		if (deletedResult) {
			res.sendStatus(200);
		} else {
			res.status(400).json('Juego no eliminado');
		}
	} catch (err) {
		res.status(400).json(err.message);
	}
};
