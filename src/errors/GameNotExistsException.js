export class GameNotExistsException extends Error {
	constructor(message) {
		super(message);
		this.name = 'GameNotExistsException';
	}
}
