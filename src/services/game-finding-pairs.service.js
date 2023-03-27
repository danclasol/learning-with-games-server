import FindingPairsGameModel from '#Models/game-finding-pairs.model.js';
import { existsGameByIdService } from './games.service.js';

export const updateGameService = async ({ id, title, pairs }) => {
	const gameExists = await existsGameByIdService({ id });

	if (!gameExists) {
		throw new Error('Game not exists');
	}

	const resultUpdate = await FindingPairsGameModel.updateOne(
		{ _id: id },
		{
			$set: {
				title,
				pairs,
			},
		}
	);

	return resultUpdate.modifiedCount > 0;
};
