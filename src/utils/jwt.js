import { SignJWT, jwtVerify } from 'jose';

export const generateAccessToken = async payload => {
	const jwtConstructor = new SignJWT({ ...payload });
	const secret = new TextEncoder().encode(process.env.JWT_PRIVATE_KEY);

	return await jwtConstructor
		.setProtectedHeader({
			alg: 'HS256',
		})
		.setIssuedAt()
		.setExpirationTime('1h')
		.sign(secret);
};

export const validateAccessToken = async ({ token }) => {
	const secret = new TextEncoder().encode(process.env.JWT_PRIVATE_KEY);
	const { payload } = await jwtVerify(token, secret);

	return payload.id;
};
