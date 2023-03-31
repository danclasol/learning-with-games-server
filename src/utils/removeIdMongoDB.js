export const removeIdMongoDB = document => {
	const { _id, ...rest } = document._doc;
	const documentResult = { id: _id, ...rest };

	return documentResult;
};
