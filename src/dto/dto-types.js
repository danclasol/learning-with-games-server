import { Type } from '@sinclair/typebox';

export const titleDTOSchema = Type.String({
	minLength: 2,
	maxLength: 50,
	errorMessage: {
		minLength: 'El nombre debe tener al menos 2 caracteres',
		maxLength: 'El nombre tiene que tener como máximo 50 caracteres',
	},
});

export const emailDTOSchema = Type.String({
	format: 'email',
	errorMessage: 'El formato del email no es válido',
});

export const dateDTOSchema = Type.String({
	format: 'date',
	errorMessage: {
		type: 'Debe ser una fecha',
		format: 'Formato fecha incorrecto',
	},
});
