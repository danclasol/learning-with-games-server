export class CollectionNotExistsException extends Error {
	constructor(message) {
		super(message);
		this.name = 'CollectionNotExistsException';
	}
}
