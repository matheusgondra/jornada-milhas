export class MissingParamError extends Error {
	constructor(field: string) {
		super(`MissingParamError: ${field}`);
		this.name = "MissingParamError";
	}
}
