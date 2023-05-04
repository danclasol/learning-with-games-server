import GameModel from '#Models/game.model.js';
import { createGame } from '#Models/gameFactory.js';
import { removeIdMongoDB } from '#Utils/removeIdMongoDB.js';
import { findGroupById } from './groups.service.js';

export const findUserTotalGameService = async ({
	userId,
	groupId,
	title = '',
	type = '',
}) => {
	const filter = {
		userId,
		groupId,
		title: { $regex: title, $options: 'i' },
		type: { $regex: type, $options: 'i' },
	};

	return await GameModel.find(filter).exec();
};

export const findUserGamesService = async ({
	userId,
	groupId,
	title = '',
	type = '',
	page,
	limit,
	sort,
	order,
}) => {
	const filter = {
		userId,
		title: { $regex: title, $options: 'i' },
		type: { $regex: type, $options: 'i' },
	};

	if (groupId) filter.groupId = groupId;

	const games = await GameModel.find(filter)
		.sort({ [sort]: order })
		.skip((page - 1) * 10)
		.limit(limit)
		.exec();

	const gamesResult = games.map(game => removeIdMongoDB(game));

	const gamesResult2 = await Promise.all(
		gamesResult.map(async game => {
			const group = await findGroupById({ id: game.groupId });

			return {
				...game,
				group,
			};
		})
	);

	console.log({ gamesResult2 });

	return gamesResult2;
};

export const findGameById = async ({ userId, id }) => {
	const data = await GameModel.findOne({
		_id: id,
		// userId,
	}).exec();

	const game = data !== null && removeIdMongoDB(data);

	return game;
};

export const existsGameByIdService = async ({ id }) => {
	const game = await GameModel.findOne({ _id: id }).exec();
	return Boolean(game);
};

export const createGameService = async ({
	id,
	type,
	title,
	groupId,
	userId,
}) => {
	const gameExists = await existsGameByIdService({ id });

	if (gameExists) {
		throw new Error('Game already exists');
	}

	const game = createGame({ id, type, title, groupId, userId });

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
