import { titleDTOSchema } from '#Dto/dto-types.js';
import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addErrors from 'ajv-errors';

const UpdateQuizGameDTOSchema = Type.Object(
	{
		type: Type.String(),
		title: titleDTOSchema,
		questions: Type.Optional(
			Type.Array(
				Type.Object({
					question: Type.String(),
					points: Type.Number(),
					answer: Type.Number(),
					options: Type.Array(Type.Object({ text: Type.String() })),
				})
			)
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

const validateSchema = ajv.compile(UpdateQuizGameDTOSchema);

const updateQuizGameDTO = (req, res, next) => {
	const isDTOValid = validateSchema(req.body);

	if (!isDTOValid) {
		return res
			.status(400)
			.send({ errors: validateSchema.errors.map(error => error.message) });
	}

	next();
};

export default updateQuizGameDTO;
