export class EmailAlreadyExistsError extends Error {
	constructor(message) {
		super(message);
		this.name = 'EmailAlreadyExistsError';
	}
}
