export class CollectionAlreadyExistsException extends Error {
	constructor(message) {
		super(message);
		this.name = 'CollectionAlreadyExistsException';
	}
}
