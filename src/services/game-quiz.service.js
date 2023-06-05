import { GameNotExistsException } from '#Errors/GameNotExistsException.js';
import QuizGameModel from '#Models/game-quiz.model.js';
import { existsGameByIdService } from './games.service.js';

export const updateGameService = async ({ id, title, questions }) => {
	const gameExists = await existsGameByIdService({ id });

	if (!gameExists) {
		throw new GameNotExistsException('Game not exists');
	}

	const resultUpdate = await QuizGameModel.updateOne(
		{ _id: id },
		{
			$set: {
				title,
				questions,
			},
		}
	);

	return resultUpdate.modifiedCount > 0;
};
