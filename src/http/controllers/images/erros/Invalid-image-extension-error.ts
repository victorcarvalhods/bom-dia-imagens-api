export class InvalidImageExtension extends Error {
	constructor() {
		super('Invalid Image file Exentension. expected one of the following: png, jpeg, jpg, gif')
	}
}