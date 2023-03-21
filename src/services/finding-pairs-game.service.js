import FindingPairsGameModel from '#Models/finding-pairs-games.model.js';
import { existsGameByIdService } from './games.service.js';

export const existsPairInGameByIdService = async ({ id, pairId }) => {
	const game = await FindingPairsGameModel.findOne({
		_id: id,
		'pairs.id': pairId,
	}).exec();

	return Boolean(game);
};

export const updateGameService = async ({ id, title }) => {
	const gameExists = await existsGameByIdService({ id });

	if (!gameExists) {
		throw new Error('Game not exists');
	}

	const resultUpdate = await FindingPairsGameModel.updateOne(
		{ _id: id },
		{
			$set: {
				title,
			},
		}
	);

	return resultUpdate.modifiedCount > 0;
};

export const addPairToGameService = async ({ id, pairId, text, image }) => {
	const gameExists = await existsGameByIdService({ id });

	if (!gameExists) {
		throw new Error('Game not exists');
	}

	const resultUpdate = await FindingPairsGameModel.updateOne(
		{ _id: id },
		{
			$push: {
				pairs: { id: pairId, text, image },
			},
		}
	);

	return resultUpdate.modifiedCount > 0;
};

export const updatePairFromGameService = async ({
	id,
	pairId,
	text,
	image,
}) => {
	const gameExists = await existsGameByIdService({ id });

	if (!gameExists) {
		throw new Error('Game not exists');
	}

	const pairExists = await existsPairInGameByIdService({ id, pairId });

	if (!pairExists) {
		throw new Error('Pair no existe');
	}

	const resultUpdate = await FindingPairsGameModel.updateOne(
		{ _id: id, 'pairs.id': pairId },
		{
			$set: {
				'pairs.$.text': text,
				'pairs.$.image': image,
			},
		}
	);

	return resultUpdate.modifiedCount > 0;
};

export const deletePairFromGameService = async ({ id, pairId }) => {
	const gameExists = await existsGameByIdService({ id });

	if (!gameExists) {
		throw new Error('Game not exists');
	}

	const pairExists = await existsPairInGameByIdService({ id, pairId });

	if (!pairExists) {
		throw new Error('Pair not exists');
	}

	const resultUpdate = await FindingPairsGameModel.updateOne(
		{ _id: id },
		{
			$pull: {
				pairs: { id: pairId },
			},
		}
	);

	return resultUpdate.modifiedCount > 0;
};
