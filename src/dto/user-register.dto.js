import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addErrors from 'ajv-errors';
import addFormats from 'ajv-formats';
import {
	emailDTOSchema,
	nameDTOSchema,
	passwordDTOSchema,
} from './dto-types.js';

const RegisterDTOSchema = Type.Object(
	{
		name: nameDTOSchema,
		email: emailDTOSchema,
		password: passwordDTOSchema,
	},
	{
		additionalProperties: true,
	}
);

const ajv = new Ajv({ allErrors: true })
	.addKeyword('kind')
	.addKeyword('modifier');

ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);
addFormats(ajv, ['email']);
addErrors(ajv);

const validateSchema = ajv.compile(RegisterDTOSchema);

const userRegisterDTO = (req, res, next) => {
	const isDTOValid = validateSchema(req.body);

	if (!isDTOValid) {
		return res
			.status(400)
			.send({ error: validateSchema.errors.map(error => error.message) });
	}

	next();
};

export default userRegisterDTO;
