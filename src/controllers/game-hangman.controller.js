import { updateGameService } from '#Services/game-hangman.service.js';

export const updateGame = async (req, res) => {
	const { id } = req.params;
	const { body } = req;
	const { type, title, words } = body;

	try {
		const updateResult = await updateGameService({
			id,
			type,
			title,
			words,
		});

		if (updateResult) {
			res.status(200).send();
		} else {
			res.status(400).json({ error: 'Game not updated' });
		}
	} catch (err) {
		res.status(500).send();
	}
};
