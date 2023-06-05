export class GroupNotExistsException extends Error {
	constructor(message) {
		super(message);
		this.name = 'GroupNotExistsException';
	}
}
