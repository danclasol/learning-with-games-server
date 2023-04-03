import { validateAccessToken } from '#Utils/jwt.js';

const userTokenDTO = async (req, res, next) => {
	const accessToken = req.headers.authorization;

	if (!accessToken) return res.status(401).send();

	const token = accessToken.split(' ')[1];

	if (!token) return res.status(401).send();

	try {
		const userId = await validateAccessToken({ token });
		req.userId = userId;

		next();
	} catch (error) {
		return res.status(401).send(error);
	}
};

export default userTokenDTO;
