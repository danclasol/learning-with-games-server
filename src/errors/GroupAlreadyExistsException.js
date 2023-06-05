export class GroupAlreadyExistsException extends Error {
	constructor(message) {
		super(message);
		this.name = 'GroupAlreadyExistsException';
	}
}
