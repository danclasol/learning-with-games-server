const errorHandler = (err, req, res, next) => {
	console.log('errorHandle', { err });

	res.status(500).send({ error: err });
};

export default errorHandler;
