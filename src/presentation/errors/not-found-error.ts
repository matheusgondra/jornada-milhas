export class NotFoundError extends Error {
	constructor(data: string) {
		super(`NotFoundError: ${data}`);
		this.name = "NotFoundError";
	}
}
