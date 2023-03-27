import FindingPairsGameModel from '#Models/game-finding-pairs.model.js';
import HangmanGameModel from '#Models/game-hangman.model.js';

export const createGame = ({ id, type, title, userId }) => {
	let game;

	switch (type) {
		case 'finding-pairs':
			game = new FindingPairsGameModel({
				_id: id,
				type,
				title,
				creationDate: new Date(),
				userId,
			});

			break;
		case 'hangman':
			game = new HangmanGameModel({
				_id: id,
				type,
				title,
				creationDate: new Date(),
				userId,
			});

			break;
	}

	return game;
};
