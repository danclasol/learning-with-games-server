import { updateGameService } from '#Services/game-finding-pairs.service.js';

export const updateGame = async (req, res) => {
	const userId = 'dani@gmail.com';
	const { id } = req.params;
	const { body } = req;
	const { type, title, pairs } = body;

	try {
		const updateResult = await updateGameService({
			id,
			type,
			title,
			pairs,
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
