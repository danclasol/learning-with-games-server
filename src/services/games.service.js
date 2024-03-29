import { PAGINATION } from '#Constants/pagination.js';
import { CollectionNotExistsException } from '#Errors/CollectionNotExistsException.js';
import { GameNotExistsException } from '#Errors/GameNotExistsException.js';
import GameModel from '#Models/game.model.js';
import { createGame } from '#Models/gameFactory.js';
import { removeIdMongoDB } from '#Utils/removeIdMongoDB.js';
import { findGroupById } from './groups.service.js';

export const findUserTotalGameService = async ({
	userId,
	groupId,
	collectionId,
	title = '',
	type = '',
}) => {
	const filter = {
		userId,
		title: { $regex: title, $options: 'i' },
		type: { $regex: type, $options: 'i' },
	};

	if (groupId) {
		filter.groupId = groupId;
		filter.collectionId = collectionId;
	}

	return await GameModel.find(filter).exec();
};

export const findUserGamesService = async ({
	userId,
	groupId,
	collectionId,
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

	if (groupId) {
		filter.groupId = groupId;
		filter.collectionId = collectionId;
	}

	const data = await GameModel.find(filter)
		.sort({ [sort]: order })
		.skip((page - 1) * PAGINATION.ITEMS_PER_PAGE)
		.limit(limit)
		.exec();

	const games = data.map(game => removeIdMongoDB(game));

	const gamesResult = await Promise.all(
		games.map(async game => {
			const group = await findGroupById({ id: game.groupId });

			return {
				...game,
				group: group.name,
			};
		})
	);

	return gamesResult;
};

export const findGamesFromGroupService = async ({ groupId }) => {
	const filter = {
		groupId,
	};

	const data = await GameModel.find(filter).exec();

	const games = data.map(game => removeIdMongoDB(game));

	return games;
};

export const findGameById = async ({ id }) => {
	const data = await GameModel.findOne({
		_id: id,
	}).exec();

	const game = data !== null && removeIdMongoDB(data);

	const group = await findGroupById({ id: game.groupId });

	return {
		...game,
		group: group?.name,
	};
};

export const existsGameByIdService = async ({ id }) => {
	const game = await GameModel.findOne({ _id: id }).exec();
	return Boolean(game);
};

export const createGameService = async ({
	id,
	type,
	title,
	props,
	groupId,
	collectionId,
	userId,
}) => {
	const gameExists = await existsGameByIdService({ id });

	if (gameExists) {
		throw new GameNotExistsException('Game already exists');
	}

	const game = createGame({
		id,
		type,
		title,
		props,
		groupId,
		collectionId,
		userId,
	});

	const newGame = await game.save();
	const resultGame = removeIdMongoDB(newGame);

	return resultGame;
};

export const cloneGameService = async ({
	idOld,
	idNew,
	type,
	title,
	groupId,
	collectionId,
	userId,
}) => {
	const gameExists = await findGameById({ id: idOld });

	if (!gameExists) {
		throw new GameNotExistsException('Game to clone not exists');
	}

	const game = createGame({
		id: idNew,
		type,
		title,
		groupId,
		collectionId,
		userId,
	});

	// Clone properties
	const {
		id,
		type: typeOld,
		title: titleOld,
		creationDate,
		userId: userIdOld,
		createdAt,
		updatedAt,
		...rest
	} = gameExists;

	const gameCloned = { ...game._doc, ...rest, _id: idNew };
	game._doc = gameCloned;

	const newGame = await game.save();
	const resultGame = removeIdMongoDB(newGame);

	return resultGame;
};

export const updateGameService = async ({ id, title, groupId }) => {
	const gameExists = await existsGameByIdService({ id });

	if (!gameExists) {
		throw new GameNotExistsException('Game not exists');
	}

	const resultUpdate = await GameModel.updateOne(
		{ _id: id },
		{
			$set: {
				title,
				groupId,
			},
		}
	);

	return resultUpdate.modifiedCount > 0;
};

export const deleteGameService = async ({ id }) => {
	const gameExists = await existsGameByIdService({ id });

	if (!gameExists) {
		throw new GameNotExistsException('Game not exists');
	}

	const resultDelete = await GameModel.deleteOne({ _id: id });

	return resultDelete.deletedCount > 0;
};

export const deleteGamesFromGroupService = async ({ groupId }) => {
	const groupExists = await findGroupById({ id: groupId });

	if (!groupExists) {
		throw new GameNotExistsException('Group not exists');
	}

	const resultDelete = await GameModel.deleteMany({ groupId });

	return resultDelete.deletedCount > 0;
};

export const deleteGamesFromCollectionService = async ({
	groupId,
	collectionId,
}) => {
	const groupExists = await findGroupById({ id: groupId });

	if (!groupExists) {
		throw new GameNotExistsException('Group not exists');
	}

	const collectionExits = groupExists?.collections.find(
		item => item.id === collectionId
	);

	if (!collectionExits) {
		throw new CollectionNotExistsException('Collection not exists');
	}

	const resultDelete = await GameModel.deleteMany({
		groupId,
		collectionId,
	});

	return resultDelete.deletedCount > 0;
};
