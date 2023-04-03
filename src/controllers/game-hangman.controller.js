import { updateGameService } from '#Services/game-hangman.service.js';

export const updateGame = async (req, res) => {
	const userId = req.userId;
	const { id } = req.params;
	const { body } = req;
	const { type, title, words } = body;

	try {
		const updateResult = await updateGameService({
			id,
			type,
			title,
			words,
			userId,
		});

		if (updateResult) {
			res.sendStatus(200);
		} else {
			res.status(400).json('Game not updated');
		}
	} catch (err) {
		res.status(400).json(err.message);
	}
};
