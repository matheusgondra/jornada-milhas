export class InvalidParamError extends Error {
	constructor(field: string) {
		super(`InvalidParamError: ${field}`);
		this.name = "InvalidParamError";
	}
}
