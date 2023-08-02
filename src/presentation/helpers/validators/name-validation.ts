import { InvalidParamError } from "../../errors/invalid-param-error";
import { Validation } from "./validation";

export class NameValidation implements Validation {
	private readonly fieldName: string;

	constructor(fieldName: string) {
		this.fieldName = fieldName;
	}

	validate(input: any): Error | null {
		if (!/^[A-Za-z]{3,}$/.test(input[this.fieldName])) {
			return new InvalidParamError(this.fieldName);
		}
		return null;
	}
}
