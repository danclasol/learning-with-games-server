export const removeIdMongoDB = game => {
	const { _id, ...rest } = game._doc;
	const gameResult = { id: _id, ...rest };

	return gameResult;
};
