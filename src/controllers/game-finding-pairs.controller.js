import { updateGameService } from '#Services/game-finding-pairs.service.js';

export const updateGame = async (req, res) => {
	const userId = req.userId;
	const { id } = req.params;
	const { body } = req;
	const { title, mode, pairs } = body;

	try {
		const updateResult = await updateGameService({
			id,
			mode,
			title,
			pairs,
			userId,
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
