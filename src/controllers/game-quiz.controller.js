import { updateGameService } from '#Services/game-quiz.service.js';

export const updateGame = async (req, res) => {
	const { id } = req.params;
	const { body } = req;
	const { type, title, questions } = body;

	try {
		const updateResult = await updateGameService({
			id,
			type,
			title,
			questions,
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
