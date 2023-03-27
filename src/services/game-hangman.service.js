import HangmanGameModel from '#Models/game-hangman.model.js';
import { existsGameByIdService } from './games.service.js';

export const updateGameService = async ({ id, title, words }) => {
	const gameExists = await existsGameByIdService({ id });

	if (!gameExists) {
		throw new Error('Game not exists');
	}

	const resultUpdate = await HangmanGameModel.updateOne(
		{ _id: id },
		{
			$set: {
				title,
				words,
			},
		}
	);

	return resultUpdate.modifiedCount > 0;
};
