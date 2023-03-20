import FindingPairsGameModel from '#Models/finding-pairs-games.js';
import GameModel from '#Models/game.model.js';
import HangmanGameModel from '#Models/hangman-games.js';
import { removeIdMongoDB } from '#Utils/removeIdMongoDB.js';

export const findUserTotalGameService = async ({
	userId,
	title = '',
	type = '',
}) => {
	const filter = {
		// userId,
		title: { $regex: title, $options: 'i' },
		type: { $regex: type, $options: 'i' },
	};

	return await GameModel.find(filter).exec();
};

export const findUserGamesService = async ({
	userId,
	title = '',
	type = '',
	page,
	limit,
	sort,
	order,
}) => {
	const filter = {
		/* _id: userId, */
		title: { $regex: title, $options: 'i' },
		type: { $regex: type, $options: 'i' },
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
	const data = await GameModel.findOne({
		_id: id,
	}).exec();

	const game = data !== null && removeIdMongoDB(data);

	return game;
};

export const existsGameByIdService = async ({ id }) => {
	const game = await GameModel.findOne({ _id: id }).exec();
	return Boolean(game);
};

export const createGameService = async ({ id, type, title, userId }) => {
	const gameExists = await existsGameByIdService(id);

	if (gameExists) {
		throw new Error('Game already exists');
	}

	let game;

	if (type === 'finding-pairs') {
		game = new FindingPairsGameModel({
			_id: id,
			type,
			title,
			creationDate: new Date(),
			userId,
		});
	}

	if (type === 'hangman') {
		game = new HangmanGameModel({
			_id: id,
			type,
			title,
			creationDate: new Date(),
			userId,
		});
	}

	const newGame = await game.save();
	const resultGame = removeIdMongoDB(newGame);

	return resultGame;
};

export const updateGameService = async ({ id, title }) => {
	const gameExists = await existsGameByIdService(id);

	if (!gameExists) {
		throw new Error('Game not exists');
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
	const gameExists = await existsGameByIdService({ id });

	if (!gameExists) {
		throw new Error('Game not exists');
	}

	const resultDelete = await GameModel.deleteOne({ _id: id });

	return resultDelete.deletedCount > 0;
};
