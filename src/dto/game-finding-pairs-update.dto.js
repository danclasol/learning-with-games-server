import { titleDTOSchema } from '#Dto/dto-types.js';
import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addErrors from 'ajv-errors';

const UpdateFindingPairsGameDTOSchema = Type.Object(
	{
		type: Type.String(),
		mode: Type.Optional(Type.String()),
		title: titleDTOSchema,
		pairs: Type.Optional(
			Type.Array(Type.Object({ text: Type.String(), image: Type.String() }))
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

const validateSchema = ajv.compile(UpdateFindingPairsGameDTOSchema);

const updateFindingPairsGameDTO = (req, res, next) => {
	const isDTOValid = validateSchema(req.body);

	if (!isDTOValid) {
		return res
			.status(400)
			.send({ errors: validateSchema.errors.map(error => error.message) });
	}

	next();
};

export default updateFindingPairsGameDTO;
