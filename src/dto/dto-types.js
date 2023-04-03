import { Type } from '@sinclair/typebox';

export const titleDTOSchema = Type.String({
	minLength: 2,
	maxLength: 50,
	errorMessage: {
		minLength: 'Title length must be higher than 2',
		maxLength: 'Title length must be lower than 50',
	},
});

export const nameDTOSchema = Type.String({
	minLength: 2,
	maxLength: 30,
	errorMessage: {
		minLength: 'Name length must be higher than 2',
		maxLength: 'Name length must be lower than 30',
	},
});

export const emailDTOSchema = Type.String({
	format: 'email',
	errorMessage: {
		type: 'Email type not valid, must be a string',
		format: 'Email format not valid',
	},
});

export const dateDTOSchema = Type.String({
	format: 'date',
	errorMessage: {
		type: 'Must be a date',
		format: 'Date formta not valid',
	},
});

export const passwordDTOSchema = Type.String({
	format: 'password',
	minLength: 10,
	maxLength: 25,
	errorMessage: {
		type: 'Password type not valid, must be a string',
		format: 'Password format not valid. Must contain capitals and numbers',
		minLength: 'Password length must be higher than 10',
		maxLength: 'Password length must be lower than 25',
	},
});
