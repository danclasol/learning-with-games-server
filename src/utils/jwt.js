import { ALGORITHM, EXPIRATION_TIME, TOKEN_TYPE } from '#Constants/jwt.js';
import { SignJWT, jwtVerify } from 'jose';

export const generateAccessToken = async payload => {
	const jwtConstructor = new SignJWT({ ...payload });
	const secret = new TextEncoder().encode(process.env.JWT_PRIVATE_KEY);

	return await jwtConstructor
		.setProtectedHeader({
			alg: ALGORITHM,
			typ: TOKEN_TYPE,
		})
		.setIssuedAt()
		.setExpirationTime(EXPIRATION_TIME)
		.sign(secret);
};

export const validateAccessToken = async ({ token }) => {
	const secret = new TextEncoder().encode(process.env.JWT_PRIVATE_KEY);
	const { payload } = await jwtVerify(token, secret);

	return payload.id;
};
