import { titleDTOSchema } from '#Dto/dto-types.js';
import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addErrors from 'ajv-errors';
import addFormats from 'ajv-formats';

const UpdateGameDTOSchema = Type.Object(
	{
		title: Type.Optional(titleDTOSchema),
		groupId: Type.Optional(Type.String()),
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
			.send({ errors: validateSchema.errors.map(error => error.message) });
	}

	next();
};

export default updateGameDTO;
