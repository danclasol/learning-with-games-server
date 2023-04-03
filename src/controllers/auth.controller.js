import { createUserService, findUserByEmail } from '#Services/users.service.js';
import { generateAccessToken } from '#Utils/jwt.js';
import { compare } from 'bcrypt';

export const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await findUserByEmail({ email });

		if (!user) return res.status(401).send();

		const checkPassword = await compare(password, user.password);

		if (!checkPassword) res.status(401).send();

		const accessToken = await generateAccessToken({ id: user.id });

		return res.send({ accessToken, user });
	} catch (err) {
		console.error(err);
		return res.status(500).send();
	}
};

export const register = async (req, res) => {
	const { name, email, password } = req.body;

	try {
		const userExists = await findUserByEmail({ email });

		if (userExists)
			return res.status(409).send({ errors: ['Email already in used'] });

		const user = await createUserService({ name, email, password });

		if (!user) {
			return res.status(400).send();
		}

		return res.status(201).json(user);
	} catch (err) {
		console.error(err);
		return res.status(500).send();
	}
};
