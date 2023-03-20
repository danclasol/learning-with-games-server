import {
	addPairToGameService,
	deletePairFromGameService,
	updateGameService,
	updatePairFromGameService,
} from '#Services/finding-pairs-game.service.js';

export const updateGame = async (req, res) => {
	const userId = 'dani@gmail.com';
	const { id } = req.params;
	const { body } = req;
	const { type, title } = body;

	try {
		const updateResult = await updateGameService({
			id,
			type,
			title,
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

export const addPairToGame = async (req, res) => {
	const { id } = req.params;
	const { body } = req;
	const { id: pairId, text, image } = body;

	try {
		const updateResult = await addPairToGameService({
			id,
			pairId,
			text,
			image,
		});

		if (updateResult) {
			res.sendStatus(200);
		} else {
			res.status(400).json('Pair not created');
		}
	} catch (err) {
		res.status(400).json(err.message);
	}
};

export const updatePairFromGame = async (req, res) => {
	const { id, pairId } = req.params;
	const { body } = req;
	const { text, image } = body;

	try {
		const updateResult = await updatePairFromGameService({
			id,
			pairId,
			text,
			image,
		});

		if (updateResult) {
			res.sendStatus(200);
		} else {
			res.status(400).json('Pair not updated');
		}
	} catch (err) {
		res.status(400).json(err.message);
	}
};

export const deletePairFromGame = async (req, res) => {
	const { id, pairId } = req.params;

	try {
		const removeResult = await deletePairFromGameService({ id, pairId });

		if (removeResult) {
			res.sendStatus(200);
		} else {
			res.status(400).json('Pair not deleted');
		}
	} catch (err) {
		res.status(400).json(err.message);
	}
};
