export class GameAlreadyExistsException extends Error {
	constructor(message) {
		super(message);
		this.name = 'GameAlreadyExistsException';
	}
}
