export class UserNotExistsException extends Error {
	constructor(message) {
		super(message);
		this.name = 'UserNotExistsException';
	}
}
