import { titleDTOSchema } from '#Dto/dto-types.js';
import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addErrors from 'ajv-errors';

const UpdateHangmanGameDTOSchema = Type.Object(
	{
		type: Type.String(),
		mode: Type.Optional(Type.String()),
		title: titleDTOSchema,
		words: Type.Optional(
			Type.Array(Type.Object({ word: Type.String(), maxTries: Type.Number() }))
		),
	},
	{
		additionalProperties: true,
	}
);

const ajv = new Ajv({ allErrors: true })
	.addKeyword('kind')
	.addKeyword('modifier');
addErrors(ajv);

const validateSchema = ajv.compile(UpdateHangmanGameDTOSchema);

const updateHangmanGameDTO = (req, res, next) => {
	const isDTOValid = validateSchema(req.body);

	if (!isDTOValid) {
		return res
			.status(400)
			.send({ errors: validateSchema.errors.map(error => error.message) });
	}

	next();
};

export default updateHangmanGameDTO;
