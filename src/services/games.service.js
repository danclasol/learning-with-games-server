import GameModel from '#Models/game.model.js';
import { removeIdMongoDB } from '#Utils/removeIdMongoDB.js';

export const findUserGamesService = async ({
	userId,
	title = '',
	page,
	limit,
	sort,
	order,
}) => {
	const filter = {
		/* _id: userId, */
		title: { $regex: title, $options: 'i' },
	};

	const games = await GameModel.find(filter)
		.sort({ [sort]: order })
		.skip((page - 1) * 10)
		.limit(limit)
		.exec();

	const gamesResult = games.map(game => removeIdMongoDB(game));

	return gamesResult;
};

export const findGameById = async ({ userId, id }) => {
	console.log({ userId, id });

	const data = await GameModel.findOne({
		_id: id,
	}).exec();

	const game = removeIdMongoDB(data);

	return game;
};

export const existsGameByIdService = async id => {
	const game = await GameModel.findOne({ _id: id }).exec();
	return Boolean(game);
};

export const createGameService = async ({ id, type, title, userId }) => {
	const gameExists = await existsGameByIdService(id);

	if (gameExists) {
		throw new Error('Juego ya existe');
	}

	const game = new GameModel({
		_id: id,
		type,
		title,
		creationDate: new Date(),
		userId,
	});

	const newGame = await game.save();
	const resultGame = removeIdMongoDB(newGame);

	return resultGame;
};

export const updateGameService = async ({ id, title }) => {
	const gameExists = await existsGameByIdService(id);

	if (!gameExists) {
		throw new Error('Juego no existe');
	}

	const resultUpdate = await GameModel.updateOne(
		{ _id: id },
		{
			$set: {
				title,
			},
		}
	);

	return resultUpdate.modifiedCount > 0;
};

export const deleteGameService = async ({ id }) => {
	const gameExists = await existsGameByIdService(id);

	if (!gameExists) {
		throw new Error('Juego no existe');
	}

	const resultDelete = await GameModel.deleteOne({ _id: id });

	return resultDelete.deletedCount > 0;
};
