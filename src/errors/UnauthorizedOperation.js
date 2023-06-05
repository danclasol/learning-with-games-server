export class UnauthorizedOperation extends Error {
	constructor(message) {
		super(message);
		this.name = 'UnauthorizedOperation';
	}
}
