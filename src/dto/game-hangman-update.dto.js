import { titleDTOSchema } from '#Dto/dto-types.js';
import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addErrors from 'ajv-errors';
import addFormats from 'ajv-formats';

const UpdateGameDTOSchema = Type.Object(
	{
		type: Type.String(),
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
addFormats(ajv, ['date']);
addErrors(ajv);

const validateSchema = ajv.compile(UpdateGameDTOSchema);

const updateGameDTO = (req, res, next) => {
	const isDTOValid = validateSchema(req.body);

	if (!isDTOValid) {
		return res
			.status(400)
			.send({ errors: validateSchema.errors.map(error => error) });
	}

	next();
};

export default updateGameDTO;
