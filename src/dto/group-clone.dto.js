import { titleDTOSchema } from '#Dto/dto-types.js';
import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addErrors from 'ajv-errors';

const CloneGroupDTOSchema = Type.Object(
	{
		idOld: Type.String(),
		idNew: Type.String(),
		name: titleDTOSchema,
		level: Type.Optional(Type.String()),
		course: Type.Optional(Type.String()),
	},
	{
		additionalProperties: true,
	}
);

const ajv = new Ajv({ allErrors: true })
	.addKeyword('kind')
	.addKeyword('modifier');
addErrors(ajv);

const validateSchema = ajv.compile(CloneGroupDTOSchema);

const cloneGroupDTO = (req, res, next) => {
	const isDTOValid = validateSchema(req.body);

	if (!isDTOValid) {
		return res
			.status(400)
			.send({ errors: validateSchema.errors.map(error => error.message) });
	}

	next();
};

export default cloneGroupDTO;
