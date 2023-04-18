import { updateGameService } from '#Services/game-quiz.service.js';

export const updateGame = async (req, res) => {
	const userId = req.userId;
	const { id } = req.params;
	const { body } = req;
	const { type, title, questions } = body;

	try {
		const updateResult = await updateGameService({
			id,
			type,
			title,
			questions,
			userId,
		});

		if (updateResult) {
			res.status(200).send();
		} else {
			res.status(400).json({ error: 'Game not updated' });
		}
	} catch (err) {
		console.log(err);
		res.status(500).send();
	}
};
